import { NextResponse } from 'next/server';
import { client } from '../../../sanity/client';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { addMinutes, isBefore } from 'date-fns';

export async function POST(request: Request) {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    // Get the authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401, headers }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Create a Supabase client for the route handler
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Verify the token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401, headers }
      );
    }

    // Parse request body
    const { orderId, userId } = await request.json();

    // Verify the user ID matches
    if (userId !== user.id) {
      return NextResponse.json(
        { error: 'User ID mismatch' },
        { status: 403, headers }
      );
    }

    console.log('Processing order cancellation:', {
      userId: user.id,
      orderId
    });

    // Get user's Sanity ID
    const userData = await client.fetch(
      *[_type == "user" && supabaseId == $userId][0]._id,
      { userId: user.id }
    );

    console.log('Found user data:', userData);

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found in Sanity' },
        { status: 404, headers }
      );
    }

    // Get the order
    const order = await client.fetch(`
      *[_type == "order" && _id == $orderId && customer._ref == $userId][0]{
        _id,
        createdAt,
        status
      }
    `, { 
      orderId,
      userId: userData 
    });

    console.log('Found order:', order);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found or unauthorized' },
        { status: 404, headers }
      );
    }

    // Check if order can be cancelled
    const orderDate = new Date(order.createdAt);
    const tenMinutesAfterOrder = addMinutes(orderDate, 10);
    const now = new Date();

    if (!isBefore(now, tenMinutesAfterOrder)) {
      return NextResponse.json(
        { error: 'Order cannot be cancelled after 10 minutes' },
        { status: 400, headers }
      );
    }

    if (!['pending', 'processing'].includes(order.status.toLowerCase())) {
      return NextResponse.json(
        { error: Order cannot be cancelled in ${order.status} status },
        { status: 400, headers }
      );
    }

    // Cancel the order
    try {
      await client
        .patch(orderId)
        .set({ status: 'cancelled' })
        .commit();

      console.log('Order cancelled successfully');
      return NextResponse.json({ success: true }, { headers });
    } catch (sanityError) {
      console.error('Error updating order in Sanity:', sanityError);
      return NextResponse.json(
        { error: 'Failed to update order status' },
        { status: 500, headers }
      );
    }
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500, headers }
    );
  }
}
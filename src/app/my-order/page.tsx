'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { client } from '../../sanity/client';
import { format, addMinutes, isBefore } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  selectedSize: string;
  selectedColor: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  total: number;
  items: OrderItem[];
  shippingInfo: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    country: string;
  };
}

export default function MyOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [authChecked, setAuthChecked] = useState(false);

  // Add session listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/login?redirectTo=/my-orders');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!session) {
          router.push('/login?redirectTo=/my-orders');
          return;
        }
        
        setAuthChecked(true);
      } catch (error) {
        console.error('Auth error:', error);
        router.push('/login?redirectTo=/my-orders');
      }
    };

    checkAuth();
  }, [router]);

  // Fetch orders only after auth is confirmed
  useEffect(() => {
    if (!authChecked) return;

    const fetchOrders = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Get user's Sanity ID
        const userData = await client.fetch(
          *[_type == "user" && supabaseId == $userId][0]._id,
          { userId: session.user.id }
        );

        if (!userData) {
          throw new Error('User not found');
        }

        // Fetch orders from last 90 days
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

        const orders = await client.fetch<Order[]>(`
          *[_type == "order" && customer._ref == $userId && dateTime(createdAt) >= dateTime($ninetyDaysAgo)] | order(createdAt desc) {
            _id,
            orderNumber,
            createdAt,
            status,
            total,
            items,
            shippingInfo
          }
        `, {
          userId: userData,
          ninetyDaysAgo: ninetyDaysAgo.toISOString()
        });

        setOrders(orders);
        setFilteredOrders(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authChecked, router]);

  useEffect(() => {
    const filtered = orders.filter(order => 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const formatPrice = (price: number) => {
    return PKR ${price.toLocaleString()};
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canCancelOrder = (order: Order) => {
    const orderDate = new Date(order.createdAt);
    const tenMinutesAfterOrder = addMinutes(orderDate, 10);
    const now = new Date();
    
    return (
      isBefore(now, tenMinutesAfterOrder) && 
      ['pending', 'processing'].includes(order.status.toLowerCase())
    );
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        router.push('/login?redirectTo=/my-orders');
        return;
      }

      if (!session) {
        router.push('/login?redirectTo=/my-orders');
        return;
      }

      console.log('Sending cancel request for order:', orderId);
      
      const response = await fetch('/api/cancel-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': Bearer ${session.access_token} // Add the token
        },
        credentials: 'include',
        body: JSON.stringify({ 
          orderId,
          userId: session.user.id // Add user ID to request
        }),
      });

      console.log('Response status:', response.status);

      let responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        if (response.status === 401) {
          // Try to refresh the session
          const { data: { session: refreshedSession }, error: refreshError } = 
            await supabase.auth.refreshSession();
          
          if (refreshError || !refreshedSession) {
            router.push('/login?redirectTo=/my-orders');
            return;
          }
          
          const retryResponse = await fetch('/api/cancel-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': Bearer ${refreshedSession.access_token}
            },
            credentials: 'include',
            body: JSON.stringify({ 
              orderId,
              userId: refreshedSession.user.id 
            }),
          });

          if (!retryResponse.ok) {
            throw new Error((await retryResponse.json()).error || 'Failed to cancel order');
          }

          responseData = await retryResponse.json();
        } else {
          throw new Error(responseData.error || 'Failed to cancel order');
        }
      }

      if (responseData.success) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId 
              ? { ...order, status: 'cancelled' }
              : order
          )
        );
        setFilteredOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId 
              ? { ...order, status: 'cancelled' }
              : order
          )
        );

        alert('Order cancelled successfully');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      
      let errorMessage = 'Failed to cancel order. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    }
  };

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by order number or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No orders found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Order #{order.orderNumber}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Placed on {format(new Date(order.createdAt), 'PPP', { locale: enUS })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}}>
                    {order.status}
                  </span>
                  {canCancelOrder(order) && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">
                          × {item.quantity}
                        </span>
                        <div className="text-gray-600">
                          Size: {item.selectedSize}, Color: {item.selectedColor}
                        </div>
                      </div>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
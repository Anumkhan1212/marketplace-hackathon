export default function SizeGuidePage() {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Size Guide</h1>
            <p className="text-gray-600 text-center mb-12">
              Find your perfect fit with our detailed size charts
            </p>
  
            {/* Women's Size Guide */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Women's Size Guide</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Size (US)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Bust (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Waist (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Hips (inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">XS</td>
                      <td className="px-6 py-4 text-sm text-gray-600">31-32</td>
                      <td className="px-6 py-4 text-sm text-gray-600">23-24</td>
                      <td className="px-6 py-4 text-sm text-gray-600">33-34</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">S</td>
                      <td className="px-6 py-4 text-sm text-gray-600">33-34</td>
                      <td className="px-6 py-4 text-sm text-gray-600">25-26</td>
                      <td className="px-6 py-4 text-sm text-gray-600">35-36</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">M</td>
                      <td className="px-6 py-4 text-sm text-gray-600">35-36</td>
                      <td className="px-6 py-4 text-sm text-gray-600">27-28</td>
                      <td className="px-6 py-4 text-sm text-gray-600">37-38</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">L</td>
                      <td className="px-6 py-4 text-sm text-gray-600">37-39</td>
                      <td className="px-6 py-4 text-sm text-gray-600">29-31</td>
                      <td className="px-6 py-4 text-sm text-gray-600">39-41</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">XL</td>
                      <td className="px-6 py-4 text-sm text-gray-600">40-42</td>
                      <td className="px-6 py-4 text-sm text-gray-600">32-34</td>
                      <td className="px-6 py-4 text-sm text-gray-600">42-44</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">XXL</td>
                      <td className="px-6 py-4 text-sm text-gray-600">43-45</td>
                      <td className="px-6 py-4 text-sm text-gray-600">35-37</td>
                      <td className="px-6 py-4 text-sm text-gray-600">45-47</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  
            {/* Men's Size Guide */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Men's Size Guide</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Size (US)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Chest (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Waist (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Hips (inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">S</td>
                      <td className="px-6 py-4 text-sm text-gray-600">34-36</td>
                      <td className="px-6 py-4 text-sm text-gray-600">28-30</td>
                      <td className="px-6 py-4 text-sm text-gray-600">35-37</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">M</td>
                      <td className="px-6 py-4 text-sm text-gray-600">38-40</td>
                      <td className="px-6 py-4 text-sm text-gray-600">31-33</td>
                      <td className="px-6 py-4 text-sm text-gray-600">38-40</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">L</td>
                      <td className="px-6 py-4 text-sm text-gray-600">42-44</td>
                      <td className="px-6 py-4 text-sm text-gray-600">34-36</td>
                      <td className="px-6 py-4 text-sm text-gray-600">41-43</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">XL</td>
                      <td className="px-6 py-4 text-sm text-gray-600">46-48</td>
                      <td className="px-6 py-4 text-sm text-gray-600">37-39</td>
                      <td className="px-6 py-4 text-sm text-gray-600">44-46</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">XXL</td>
                      <td className="px-6 py-4 text-sm text-gray-600">50-52</td>
                      <td className="px-6 py-4 text-sm text-gray-600">40-42</td>
                      <td className="px-6 py-4 text-sm text-gray-600">47-49</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  
            {/* Toddler Size Guide */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Toddler Size Guide (2T - 5T)</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Size (US)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Age Range</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Height (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Weight (kg)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Chest (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Waist (inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">2T</td>
                      <td className="px-6 py-4 text-sm text-gray-600">1.5 - 2 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">33 - 35</td>
                      <td className="px-6 py-4 text-sm text-gray-600">11 - 13.6</td>
                      <td className="px-6 py-4 text-sm text-gray-600">20 - 21</td>
                      <td className="px-6 py-4 text-sm text-gray-600">19 - 20</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">3T</td>
                      <td className="px-6 py-4 text-sm text-gray-600">2 - 3 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">35 - 38</td>
                      <td className="px-6 py-4 text-sm text-gray-600">30 - 34</td>
                      <td className="px-6 py-4 text-sm text-gray-600">21 - 22</td>
                      <td className="px-6 py-4 text-sm text-gray-600">20 - 21</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">4T</td>
                      <td className="px-6 py-4 text-sm text-gray-600">3 - 4 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">38 - 41</td>
                      <td className="px-6 py-4 text-sm text-gray-600">34 - 38</td>
                      <td className="px-6 py-4 text-sm text-gray-600">22 - 23</td>
                      <td className="px-6 py-4 text-sm text-gray-600">21 - 22</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">5T</td>
                      <td className="px-6 py-4 text-sm text-gray-600">4 - 5 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">41 - 44</td>
                      <td className="px-6 py-4 text-sm text-gray-600">38 - 42</td>
                      <td className="px-6 py-4 text-sm text-gray-600">23 - 24</td>
                      <td className="px-6 py-4 text-sm text-gray-600">22 - 23</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  
            {/* Kids Size Guide (4-7 years) */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Kids' Size Guide (4 - 7 years)</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Size (US)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Age Range</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Height (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Weight (kg)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Chest (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Waist (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Hips (inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">4</td>
                      <td className="px-6 py-4 text-sm text-gray-600">3 - 4 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">39 - 41</td>
                      <td className="px-6 py-4 text-sm text-gray-600">15.4 - 17.2</td>
                      <td className="px-6 py-4 text-sm text-gray-600">22 - 23</td>
                      <td className="px-6 py-4 text-sm text-gray-600">21 - 22</td>
                      <td className="px-6 py-4 text-sm text-gray-600">23 - 24</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">5</td>
                      <td className="px-6 py-4 text-sm text-gray-600">4 - 5 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">41 - 43</td>
                      <td className="px-6 py-4 text-sm text-gray-600">38 - 42</td>
                      <td className="px-6 py-4 text-sm text-gray-600">23 - 24</td>
                      <td className="px-6 py-4 text-sm text-gray-600">22 - 23</td>
                      <td className="px-6 py-4 text-sm text-gray-600">24 - 25</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">6</td>
                      <td className="px-6 py-4 text-sm text-gray-600">5 - 6 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">43 - 45</td>
                      <td className="px-6 py-4 text-sm text-gray-600">42 - 48</td>
                      <td className="px-6 py-4 text-sm text-gray-600">24 - 25</td>
                      <td className="px-6 py-4 text-sm text-gray-600">23 - 24</td>
                      <td className="px-6 py-4 text-sm text-gray-600">25 - 26</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">7</td>
                      <td className="px-6 py-4 text-sm text-gray-600">6 - 7 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">45 - 48</td>
                      <td className="px-6 py-4 text-sm text-gray-600">48 - 55</td>
                      <td className="px-6 py-4 text-sm text-gray-600">25 - 26</td>
                      <td className="px-6 py-4 text-sm text-gray-600">24 - 25</td>
                      <td className="px-6 py-4 text-sm text-gray-600">26 - 27</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  
            {/* Kids Size Guide (8-14 years) */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Kids' Size Guide (8 - 14 years)</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Size (US)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Age Range</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Height (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Weight (kg)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Chest (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Waist (inches)</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Hips (inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">8</td>
                      <td className="px-6 py-4 text-sm text-gray-600">7 - 8 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">48 - 50</td>
                      <td className="px-6 py-4 text-sm text-gray-600">25 - 27.2</td>
                      <td className="px-6 py-4 text-sm text-gray-600">26 - 27</td>
                      <td className="px-6 py-4 text-sm text-gray-600">25 - 26</td>
                      <td className="px-6 py-4 text-sm text-gray-600">27 - 28</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">10</td>
                      <td className="px-6 py-4 text-sm text-gray-600">9 - 10 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">50 - 52</td>
                      <td className="px-6 py-4 text-sm text-gray-600">60 - 70</td>
                      <td className="px-6 py-4 text-sm text-gray-600">27 - 28</td>
                      <td className="px-6 py-4 text-sm text-gray-600">26 - 27</td>
                      <td className="px-6 py-4 text-sm text-gray-600">28 - 29</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">12</td>
                      <td className="px-6 py-4 text-sm text-gray-600">11 - 12 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">52 - 55</td>
                      <td className="px-6 py-4 text-sm text-gray-600">70 - 85</td>
                      <td className="px-6 py-4 text-sm text-gray-600">28 - 30</td>
                      <td className="px-6 py-4 text-sm text-gray-600">27 - 28</td>
                      <td className="px-6 py-4 text-sm text-gray-600">29 - 31</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">14</td>
                      <td className="px-6 py-4 text-sm text-gray-600">13 - 14 years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">55 - 58</td>
                      <td className="px-6 py-4 text-sm text-gray-600">85 - 100</td>
                      <td className="px-6 py-4 text-sm text-gray-600">30 - 32</td>
                      <td className="px-6 py-4 text-sm text-gray-600">28 - 29</td>
                      <td className="px-6 py-4 text-sm text-gray-600">31 - 32</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
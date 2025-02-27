import React, { useState, useMemo } from 'react';
import { CreditCard, Apple, Search, ChevronLeft, ChevronRight, SortAsc, SortDesc } from 'lucide-react';

const PatientTable = () => {
  // Expanded mock data
  const initialData = 
  [
    
    {
        id: 1,
        name: "Aarav Mehta",
        status: "New",
        registeredDate: "Feb 10, 2024",
        location:"chennai",
        usage: 65,
        dateRange: "Jan 15, 2024 - Feb 14, 2024",
        paymentMethod: "upi",
        lastLogin: "5 min ago",
        avatar: "/api/placeholder/32/32",
        profileLink: "/patients/1",
      },
      {
        id: 2,
        name: "Priya Sharma",
        status: "Active",
        registeredDate: "Mar 5, 2023",
        location: "goa",
        usage: 45,
        dateRange: "Feb 1, 2024 - Mar 1, 2024",
        paymentMethod: "credit card",
        lastLogin: "1 hour ago",
        avatar: "/api/placeholder/32/32",
        profileLink: "/patients/2",
      },
      {
        id: 3,
        name: "Rohan Verma",
        status: "Inactive",
        registeredDate: "Aug 20, 2022",
       location:"mumbai",
        usage: 30,
        dateRange: "Jan 1, 2024 - Jan 31, 2024",
        paymentMethod: "debit card",
        lastLogin: "2 days ago",
        avatar: "/api/placeholder/32/32",
        profileLink: "/patients/3",
      },
      {
        id: 4,
        name: "Ananya Iyer",
        status: "New",
        registeredDate: "Dec 15, 2023",
       location:"delhi",
        usage: 70,
        dateRange: "Dec 10, 2023 - Jan 9, 2024",
        paymentMethod: "net banking",
        lastLogin: "10 sec ago",
        avatar: "/api/placeholder/32/32",
        profileLink: "/patients/4",
      },
      {
        id: 5,
        name: "Kabir Rao",
        status: "Active",
        registeredDate: "Oct 2, 2023",
       location:"kolkata",
        usage: 55,
        dateRange: "Sep 5, 2023 - Oct 5, 2023",
        paymentMethod: "upi",
        lastLogin: "30 min ago",
        avatar: "/api/placeholder/32/32",
        profileLink: "/patients/5",
      },
      {
        id: 6,
        name: "Neha Choudhary",
        status: "Inactive",
        registeredDate: "Jul 18, 2022",
       location:"pune",
        usage: 40,
        dateRange: "Jun 10, 2023 - Jul 10, 2023",
        paymentMethod: "credit card",
        lastLogin: "5 days ago",
        avatar: "/api/placeholder/32/32",
        profileLink: "/patients/6",
      },
      {
        id: 7,
        name: "Aryan Gupta",
        status: "Active",
        registeredDate: "Jan 29, 2024",
       location:"Bengaluru",
        usage: 85,
        dateRange: "Jan 10, 2024 - Feb 9, 2024",
        paymentMethod: "upi",
        lastLogin: "1 min ago",
        avatar: "/api/placeholder/32/32",
        profileLink: "/patients/7",
      },
      {
        id: 8,
        name: "Sanya Kapoor",
        status: "New",
        registeredDate: "Nov 12, 2023",
       location:"rajasthan",
        usage: 75,
        dateRange: "Oct 20, 2023 - Nov 19, 2023",
        paymentMethod: "debit card",
        lastLogin: "2 hours ago",
        avatar: "/api/placeholder/32/32",
        profileLink: "/patients/8",
      },
      {
        id: 9,
        name: "Vikram Nair",
        status: "Inactive",
        registeredDate: "May 5, 2022",
       location:"kochi",
        usage: 20,
        dateRange: "Apr 1, 2023 - Apr 30, 2023",
        paymentMethod: "net banking",
        lastLogin: "1 week ago",
        avatar: "/api/placeholder/32/32",
        profileLink: "/patients/9",
      },
      {
        id: 10,
        name: "Meera Sen",
        status: "Active",
        registeredDate: "Sep 30, 2023",
       location:"hyderbad",
        usage: 60,
        dateRange: "Sep 1, 2023 - Sep 30, 2023",
        paymentMethod: "credit card",
        lastLogin: "10 min ago",
        avatar: "/api/placeholder/32/32",
        profileLink: "/patients/10",
      },
    ];
    
   


  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    status: '',
    paymentMethod: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  // Filter handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Sort handler
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let result = [...initialData];

    // Apply filters
    result = result.filter(item => {
      return (
        item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        item.location.toLowerCase().includes(filters.location.toLowerCase()) &&
        (filters.status === '' || item.status === filters.status) &&
        (filters.paymentMethod === '' || item.paymentMethod === filters.paymentMethod)
      );
    });

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [initialData, filters, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Payment method component
  const PaymentMethod = ({ method }) => {
    const methodConfig = {
      mastercard: { icon: CreditCard, color: 'text-gray-700', label: 'Mastercard' },
      visa: { icon: CreditCard, color: 'text-blue-600', label: 'Visa' },
      stripe: { icon: CreditCard, color: 'text-purple-600', label: 'Stripe' },
      paypal: { icon: CreditCard, color: 'text-blue-500', label: 'PayPal' },
      apple: { icon: Apple, color: 'text-gray-900', label: 'Apple Pay' }
    };

    const config = methodConfig[method] || methodConfig.mastercard;
    const Icon = config.icon;

    return (
      <div className="flex items-center">
        <Icon className={`w-6 h-6 ${config.color}`} />
        <span className="ml-2 text-sm text-gray-600">{config.label}</span>
      </div>
    );
  };

  // Column header with sort
  const SortableHeader = ({ label, field }) => (
    <div 
      className="flex items-center cursor-pointer"
      onClick={() => handleSort(field)}
    >
      <span>{label}</span>
      {sortConfig.key === field && (
        sortConfig.direction === 'asc' ? 
          <SortAsc className="w-4 h-4 ml-1" /> : 
          <SortDesc className="w-4 h-4 ml-1" />
      )}
    </div>
  );

  return (
    <div className="space-y-4 bg-gray-50 mt-2 rounded-lg shadow-md">
      {/* Filters */}

<div className="round-lg flex  justify-evenly font-semibold p-4">

<h1 className="text-primary-blue text-2xl text-center">Patients Table</h1>

</div>

      <div className="grid grid-cols-1  mt-4 md:grid-cols-4 gap-4 p-4 rounded-lg shadow ">
        


        <div className="relative">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full px-4 py-2 border rounded-lg"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <select
          className="px-4 py-2 border rounded-lg"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>  
          <option value="Bengalur">Bengalur</option>
          <option value="Chennai">Chennai</option>
        </select>

        <select
          className="px-4 py-2 border rounded-lg"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Recurring">Recurring</option>
        </select>

        <select
          className="px-4 py-2 border rounded-lg"
          value={filters.paymentMethod}
          onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
        >
          <option value="">All Payment Methods</option>
          <option value="Mastercard">Mastercard</option>
          <option value="visa">Visa</option>
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
          <option value="apple">Apple Pay</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortableHeader label="User" field="name" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortableHeader label="location" field="location" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortableHeader label="Usage" field="usage" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortableHeader label="Payment Method" field="paymentMethod" />
               
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortableHeader label="Activity" field="lastLogin" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 relative">
                      <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
                      <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white ${user.status === "New" ? "bg-green-400" : "bg-red-400"}`}></span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">
                        {user.status} | Registered: {user.registeredDate}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-bl from-blue-400 to-teal-500 h-2.5 rounded-full" 
                      style={{ width: `${user.usage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{user.dateRange}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PaymentMethod method={user.paymentMethod} /> 
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>Last login</div>
                  <div>{user.lastLogin}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow">
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? 'bg-gradient-to-bl from-blue-400 to-teal-500 text-white'
                  : 'bg-white border hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-white border disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;
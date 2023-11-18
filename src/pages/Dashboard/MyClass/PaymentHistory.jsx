
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { RiMailLine, RiCalendarLine, RiMoneyDollarCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';

const PaymentHistory = () => {
  const [sortedPaymentHistory, setSortedPaymentHistory]=useState([])
  const {user}=useContext(AuthContext)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `https://language-server-one.vercel.app/users/payments/${encodeURIComponent(user.email)}`
        );
        const data = await res.json();
   
        setSortedPaymentHistory(data);
      } catch (error) {
        console.error('Error occurred while fetching data:', error);
      }
    };

    fetchUserData();
  }, [user.email]);
  return (
<div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Payment History</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-gray-100 border-b border-gray-300 text-sm font-medium text-gray-600">Your Email</th>
            <th className="py-4 px-6 bg-gray-100 border-b border-gray-300 text-sm font-medium text-gray-600">Date</th>
            <th className="py-4 px-6 bg-gray-100 border-b border-gray-300 text-sm font-medium text-gray-600">Amount</th>
            <th className="py-4 px-6 bg-gray-100 border-b border-gray-300 text-sm font-medium text-gray-600">Transaction</th>
            <th className="py-4 px-6 bg-gray-100 border-b border-gray-300 text-sm font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedPaymentHistory.map((payment) => (
            <tr key={payment._id}>
              <td className="py-4 px-6 border-b border-gray-300">
                <div className="flex items-center">
                  <RiMailLine className="text-gray-600 text-lg mr-2" />
                  <span className="text-sm font-medium text-gray-800">{payment.email}</span>
                </div>
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                <div className="flex items-center">
                  <RiCalendarLine className="text-gray-600 text-lg mr-2" />
                  <span className="text-sm font-medium text-gray-800">{payment.date}</span>
                </div>
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                <div className="flex items-center">
                  <RiMoneyDollarCircleLine className="text-gray-600 text-lg mr-2" />
                  <span className="text-sm font-medium text-gray-800">${payment.price}</span>
                </div>
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                <div className="flex items-center">
                  <RiCheckboxCircleLine className="text-green-600 text-lg mr-2" />
                  <span className="text-sm font-medium text-green-600">{payment.transactionId}</span>
                </div>
              </td>
              <td className="py-4 px-6 border-b border-gray-300">
                <div className="flex items-center">
                  {payment.status === 'successful' ? (
                    <RiCheckboxCircleLine className="text-green-600 text-lg mr-2" />
                  ) : (
                    <RiCheckboxCircleLine className="text-yellow-600 text-lg mr-2" />
                  )}
                  <span className={payment.status === 'successful' ? 'text-sm font-medium text-green-600' : 'text-sm font-medium text-yellow-600'}>
                    {payment.status}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
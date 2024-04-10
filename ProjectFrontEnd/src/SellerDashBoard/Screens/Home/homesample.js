import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import salesStatistics from '../../salesStatistics';

const Home = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const filteredSales = salesStatistics.filter(stat => {
    const currentDate = new Date();
    
    if (selectedPeriod === 'week') {
      const sevenDaysAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 6);
      const statDate = new Date(stat.date);
      return statDate >= sevenDaysAgo && statDate <= currentDate;
    } else if (selectedPeriod === 'month') {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const statDate = new Date(stat.date);
      return statDate >= firstDayOfMonth && statDate <= lastDayOfMonth;
    
    } else if (selectedPeriod === 'year') {
      return new Date(stat.date).getFullYear() === currentDate.getFullYear();
    }
  });

  const productStatusData = {
    completed: filteredSales.reduce((acc, curr) => acc + curr.ordersCompleted, 0),
    incomplete: filteredSales.reduce((acc, curr) => acc + curr.ordersUncompleted, 0),
    pending: filteredSales.reduce((acc, curr) => acc + curr.ordersPending, 0)
  };

  const salesTrendData = filteredSales.map(stat => [new Date(stat.date).getTime(), stat.revenue]);

  const productSalesData = filteredSales.flatMap(stat => stat.productsSold.map(product => ({
    name: product.productName,
    revenue: product.revenue
  })));

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Product Status'
    },
    series: [{
      name: 'Orders',
      data: Object.entries(productStatusData).map(([status, count]) => ({ name: status, y: count })),
    }],
  };

  const trendOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Sales Trend'
    },
    xAxis: {
      type: 'datetime',
    },
    series: [{
      name: 'Revenue',
      data: salesTrendData,
    }],
  };

  const barOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Product Sales'
    },
    xAxis: {
      categories: productSalesData.map(product => product.name),
    },
    series: [{
      name: 'Revenue',
      data: productSalesData.map(product => product.revenue),
    }],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <select 
        className="block w-full bg-white border border-gray-300 p-2 rounded-md mb-4"
        value={selectedPeriod} 
        onChange={e => setSelectedPeriod(e.target.value)}
      >
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Product Status</h2>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Sales Trend</h2>
          <HighchartsReact highcharts={Highcharts} options={trendOptions} />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Product Sales</h2>
          <HighchartsReact highcharts={Highcharts} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Home;

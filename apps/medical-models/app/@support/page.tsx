import * as React from 'react';

export default async function SupportDashboardPage() {
  return (
    <div>
      <h2>Support Dashboard</h2>
      <div>
        <h3>217</h3>
        <h4>Organisations</h4>
      </div>
      <div>
        <h3>949 Total Users</h3>
        <p>(Insert line graph of total users over time)</p>
      </div>
      <div>
        <h3>4012 Total Documents</h3>
        <p>(Insert line graph of total documents over time)</p>
      </div>
      <div>
        <h3>20,142 Total Comments</h3>
        <p>(Insert line graph of total comments over time)</p>
      </div>
      <div>
        <h3>Most popular model: Half-life</h3>
        <p>(Insert horizontal bar chart ranking most popular models)</p>
      </div>
    </div>
  );
}

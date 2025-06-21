export default function AdminPage() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Most Active Users</h3>
        <div>
          <h4>By Document</h4>
          <p>
            (Insert horizontal bar chart ranking users by documents they own)
          </p>
        </div>
        <div>
          <h4>By Comments</h4>
          <p>(Insert horizontal bar chart ranking users by number of comments made)</p>
        </div>
      </div>
      <div>
        <h3>Total number of documents</h3>
        <p>(Insert Trend over time)</p>
      </div>
      <div>
        <h3>Total number of comments</h3>
        <p>(Insert trend over time)</p>
      </div>
      <div>
        <h3>Most popular models</h3>
        <p>(Insert horizontal bar chart ranking model popularity</p>
      </div>
    </div>
  );
}

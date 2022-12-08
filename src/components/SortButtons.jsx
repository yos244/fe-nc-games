export const SortButtons = ({ sort, setSort, order, setOrder }) => {
  return (
    <div>
      <div class="dropdown">
        <button class="dropbtn">Sort By: {sort}</button>
        <div class="dropdown-content">
          <a onClick={() => setSort("None")}>None</a>
          <a onClick={() => setSort("title")}>title</a>
          <a onClick={() => setSort("designer")}>designer</a>
          <a onClick={() => setSort("owner")}> owner</a>
          <a onClick={() => setSort("category")}> category</a>
          <a onClick={() => setSort("created_at")}> Date</a>
          <a onClick={() => setSort("votes")}> votes</a>
        </div>
      </div>
<br></br>
      <div class="dropdown">
        <button class="dropbtn">Order by: {order}</button>
        <div class="dropdown-content">
          <a onClick={() => setOrder("asc")}>Ascending</a>
          <a onClick={() => setOrder("desc")}>Descending</a>
        </div>
      </div>
    </div>
  );
};

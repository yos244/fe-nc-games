export const SortButtons = ({ sort, setSort, order, setOrder }) => {
  const sortArr = [
    `None`,
    `title`,
    `designer`,
    `owner`,
    `category`,
    `created_at`,
    `votes`,
  ];
  return (
    <div>
      <div class="dropdown">
        <button class="dropbtn">Sort By: {sort}</button>
          <div class="dropdown-content">
        {sortArr.map((cat) => {
            return (<a onClick={() => setSort(cat)}>{cat}</a>)
            })}
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

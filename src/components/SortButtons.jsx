export const SortButtons = ({sort, setSort, order, setOrder}) => {
    return (
        <div>
          <div class="dropdown">
            <button class="dropbtn">Sort By: {sort}</button>
            <div class="dropdown-content">
              <a onClick={() => setSort("name")}>Name</a>
              <a onClick={() => setSort("mass")}>Mass</a>
              <a onClick={() => setSort("year")}> Year</a>
            </div>
          </div>
          <button
            type="toggle"
            onClick={() => {
              if (order === "ASC") {
                setOrder("DESC");
              } else {
                setOrder("ASC");
              }
            }}
          >
            {" "}
            asc / desc
          </button>
        </div>
      );
}
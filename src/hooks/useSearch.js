import React from "react";

const useSearch = ({ array, fields, open }) => {
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = (searchQuery) => {
    setIsLoading(true);
    const filtered = array.filter((item, index) => {
      const searchresult = fields.filter((fieldName) => {
        const fieldValue = JSON.stringify(item[fieldName])?.toLowerCase();
        return fieldValue.includes(searchQuery?.toLowerCase());
      });

      return searchresult?.length > 0 ? true : false;
    });
    setData(filtered);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  React.useEffect(() => {
    if (query === "") {
      setData(array);
    } else if (query.length > 1) {
      handleSearch(query);
    }
  }, [query, open]);

  // React.useEffect(() => {
  //   setData(array);
  // }, [array]);
  return {
    query,
    setQuery,
    data,
    handleSearch,
    isLoading,
  };
};

export default useSearch;

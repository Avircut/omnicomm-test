import { Pagination } from "widgets/Pagination/Pagination";
import cls from "./UniversitiesPage.module.scss";
import { memo, useCallback, useEffect, useState } from "react";
import { Table } from "widgets/Table/Table";
import { fetchUniversities } from "../../model/services/fetchUniversities";
import { useDebounce } from "../../../shared/hooks/useDebounce";
// По-хорошему конечно нужно переписать всё на Redux, с ним придет и из коробки обработка загрузки и ошибок
export const UniversitiesPage = memo((props) => {
  const {} = props;
  const [color, setColor] = useState("red"); // Зачем нужен цвет я так и не понял (но он был)
  const [country, setCountry] = useState("Russian Federation");
  const [universities, setUniversities] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  useEffect(() => {
    debouncedFetchData();
  }, [setPage,country,debouncedFetchData]);
  const fetchData = () => {
    setPage(1);
    return fetchUniversities(country).then(res => setUniversities(res.data))
  }
  const debouncedFetchData = useDebounce(fetchData,500)
  const onCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const onPageChange = useCallback((page) => {
    setPage(page)
  },[setPage])
  return (
    <div>
      <label htmlFor="#search">Поиск</label>
      <br />
      <input
        id="search"
        onChange={onCountryChange}
        type="string"
        value={country}
      />
      <Table rows={universities.slice(page*itemsPerPage,page*itemsPerPage+itemsPerPage)} />
      <Pagination page={page} itemsPerPage={itemsPerPage} totalItems={universities.length} onPageChange={onPageChange} />
      <div>{color}</div>
    </div>
  );
});

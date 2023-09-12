import cls from "./Pagination.module.scss";
import { memo, useCallback, useMemo } from "react";

export const Pagination = memo((props) => {
  const { onPageChange, itemsPerPage, totalItems,page } = props;
  const totalPages = useMemo(
    () => Math.floor(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );
  const handleClick = useCallback((pageNumber) => {
    onPageChange(pageNumber);
  }, []);
  if(!totalPages || totalPages < 2) return null; 
  return (
    <div className={cls.pagination}>
      {Array(totalPages).fill(1).map((_, i) => 
        <button
          key={i + 1}
          onClick={() => handleClick(i + 1)}
          className={i + 1 === page ? cls.active : ""}
        >
          {i + 1}
        </button>
      )}
    </div>
  );
});

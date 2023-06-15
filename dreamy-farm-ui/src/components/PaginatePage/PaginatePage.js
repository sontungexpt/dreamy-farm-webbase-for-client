import { clsx } from 'clsx';
import PropTypes from 'prop-types';
import { useMemo, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

import styles from './PaginatePage.module.scss';

function PaginatePage({
  className,
  renderSpacingClassName,
  paginationClassName,

  responsive,
  // responsive:{
  //    pageRangeDisplayed,
  //    marginPagesDisplayed,
  //    marginPages: func,return number,
  //    pageRange: func,return number
  // }
  nextLabel = 'Next',
  previousLabel = 'Prev',

  onPageChange,

  data,
  renderItem,
  itemsPerPage,
}) {
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(
    responsive?.pageRangeDisplayed ? responsive.pageRangeDisplayed : 5,
  );
  const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(
    responsive?.marginPagesDisplayed ? responsive.marginPagesDisplayed : 2,
  );
  const [pageOffset, setPageOffset] = useState(0);
  const { t } = useTranslation('translations');

  // logic
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const displayItems = useMemo(() => {
    const itemsVisited = pageOffset * itemsPerPage;
    return data.slice(itemsVisited, itemsVisited + itemsPerPage);
  }, [data, pageOffset, itemsPerPage]);

  // responsive
  useEffect(() => {
    const handlePageRangeResponsive = () => {
      // custom responsive
      if (responsive?.pageRange) {
        setPageRangeDisplayed(responsive.pageRange);
        return;
      }

      // default responsive
      if (window.innerWidth < 900) {
        setPageRangeDisplayed(2);
      } else if (window.innerWidth < 1400) {
        setPageRangeDisplayed(3);
      } else {
        setPageRangeDisplayed(5);
      }
    };
    window.addEventListener('resize', handlePageRangeResponsive);
    return () => {
      window.removeEventListener('resize', handlePageRangeResponsive);
    };
  }, [responsive]);

  useEffect(() => {
    const handleMarginPagesResponsive = () => {
      // custom responsive
      if (responsive?.marginPages) {
        setMarginPagesDisplayed(responsive.marginPages);
        return;
      }

      // default responsive
      if (window.innerWidth < 1000) {
        setMarginPagesDisplayed(1);
      } else {
        setMarginPagesDisplayed(2);
      }
    };

    window.addEventListener('resize', handleMarginPagesResponsive);
    return () => {
      window.removeEventListener('resize', handleMarginPagesResponsive);
    };
  }, [responsive]);

  return (
    <div
      className={clsx([
        {
          [className]: className,
        },
      ])}
    >
      <div
        className={clsx([
          // NOTE:
          // default using flexbox to render items in a row and wrap
          // to next row when overflow the container width (responsive)
          // you just need add col class to each item to render items in a column
          'row',
          {
            [renderSpacingClassName]: renderSpacingClassName,
          },
        ])}
      >
        {displayItems.map((item, index) => renderItem(item, index))}
      </div>

      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        breakLabel="..."
        nextLabel={t(nextLabel)}
        previousLabel={t(previousLabel)}
        onPageChange={({ selected }) => {
          onPageChange && onPageChange(selected);
          setPageOffset(selected);
        }}
        renderOnZeroPageCount={null}
        className={clsx([
          styles.pagination,
          {
            [paginationClassName]: paginationClassName,
          },
        ])}
        pageLinkClassName={styles.page}
        activeLinkClassName={styles.active}
        previousLinkClassName={styles.control}
        nextLinkClassName={styles.control}
        disabledLinkClassName={styles.disabledControl}
      />
    </div>
  );
}

PaginatePage.propTypes = {
  className: PropTypes.string,
  paginationClassName: PropTypes.string,
  responsive: PropTypes.shape({
    pageRangeDisplayed: PropTypes.number,
    marginPagesDisplayed: PropTypes.number,
    marginPages: PropTypes.func,
    pageRange: PropTypes.func,
  }),
  renderSpacingClassName: PropTypes.string,
  onPageChange: PropTypes.func,
  nextLabel: PropTypes.string,
  previousLabel: PropTypes.string,
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default PaginatePage;

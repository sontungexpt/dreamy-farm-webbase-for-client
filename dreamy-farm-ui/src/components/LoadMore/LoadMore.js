import { useMemo, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './LoadMore.module.scss';
import { objectToArray } from '~/utils/renderObjectLikeArray';

function LoadMore({
  className,
  renderSpacingClassName,
  controlClassName,
  loadMoreClassName,
  collapseClassName,
  noDataClassName,

  autoHidden = true, // if true, the loadMoreLabel will be hidden when there is no more data to load
  canCollapse = false, //just work if autoHidden = false
  loadAllFirst, // load all data first

  noDataLabel = 'There is no data to load',
  loadMoreLabel = 'Load More',
  collapseLabel = 'Collapse',

  data, // array of data or object
  renderItem,
  itemsPerLoad = 3,
}) {
  //helper
  const workData = useMemo(() => {
    return objectToArray(data);
  }, [data]);
  const getPageCount = () => Math.ceil(workData.length / itemsPerLoad);

  //state
  const [pageOffset, setPageOffset] = useState(() => {
    if (loadAllFirst) {
      return getPageCount() - 1;
    }
    return 0;
  });
  const pageCount = getPageCount();

  const displayItems = useMemo(() => {
    const itemsVisited = pageOffset * itemsPerLoad;
    return workData.slice(0, itemsVisited + itemsPerLoad);
  }, [workData, pageOffset, itemsPerLoad]);

  //handler
  const handleLoadMore = () => {
    setPageOffset(pageOffset + 1);
  };

  const handleCollapse = () => {
    setPageOffset(0);
  };

  return (
    <div
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
      ])}
    >
      <div
        className={clsx([
          styles.container,
          {
            [renderSpacingClassName]: renderSpacingClassName,
          },
        ])}
      >
        {displayItems.map((item, index) =>
          renderItem(
            item,
            index,
            Object.keys(data)[index],
            // key
            // if data is an array, key is index
            // if data is an object, key is the key of the object
          ),
        )}
      </div>
      {(() => {
        if (workData.length > 0) {
          if (pageCount - 1 === pageOffset) {
            if (autoHidden) {
              return;
            }
            if (canCollapse) {
              return (
                pageOffset > 0 && (
                  <p
                    className={clsx([
                      {
                        [controlClassName]: controlClassName,
                      },
                      {
                        [collapseClassName]: collapseClassName,
                      },
                    ])}
                    onClick={handleCollapse}
                  >
                    {collapseLabel}
                  </p>
                )
              );
            }
          }
          return (
            workData.length > displayItems.length && (
              <p
                className={clsx([
                  {
                    [controlClassName]: controlClassName,
                  },
                  {
                    [loadMoreClassName]: loadMoreClassName,
                  },
                ])}
                onClick={handleLoadMore}
              >
                {loadMoreLabel}
              </p>
            )
          );
        } else {
          return (
            <p
              className={clsx([
                {
                  [controlClassName]: controlClassName,
                },
                {
                  [noDataClassName]: noDataClassName,
                },
              ])}
            >
              {noDataLabel}
            </p>
          );
        }
      })()}
    </div>
  );
}

LoadMore.propTypes = {
  className: PropTypes.string,
  renderSpacingClassName: PropTypes.string,
  loadMoreClassName: PropTypes.string,
  collapseClassName: PropTypes.string,
  noDataClassName: PropTypes.string,
  controlClassName: PropTypes.string,

  autoHidden: PropTypes.bool, // if true, the loadMoreLabel will be hidden when there is no more data to load
  canCollapse: PropTypes.bool, //just work if autoHidden = false
  loadAllFirst: PropTypes.bool,

  collapseLabel: PropTypes.node,
  loadMoreLabel: PropTypes.node,
  noDataLabel: PropTypes.node,

  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.objectOf(PropTypes.any),
  ]).isRequired,
  renderItem: PropTypes.func.isRequired,
  itemsPerLoad: PropTypes.number,
};

export default LoadMore;

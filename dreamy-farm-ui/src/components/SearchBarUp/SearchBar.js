import { clsx } from 'clsx';
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import {
  autoUpdate,
  offset,
  shift,
  size,
  flip,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  FloatingFocusManager,
} from '@floating-ui/react';
import { search } from '~/apiServices/searchServices';

import { useDebounce } from '~/hooks';
import styles from './SearchBar.module.scss';
import ItemWrapper from './ItemWrapper';
import Loader from '~/components/Loader';
import { Search as SearchIcon } from '~/assets/images/icons/SvgIcons';
import { history } from '~/utils';
import { routes as routesConfig } from '~/configs';
import { useTranslation } from 'react-i18next';

function SearchBar({
  placeholder,

  className,
  inputClassName,
  floaterClassName,
  itemWrapperClassName,
  itemWrapperActiveClassName,

  renderItem,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);
  const [items, setItems] = useState([]);
  const listRef = useRef([]);
  const { isLoading, debounceValue } = useDebounce(inputValue, 500);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      flip({ padding: 10 }),
      offset(4),
      shift(),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const role = useRole(context, { role: 'listbox' });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [role, dismiss, listNav],
  );

  function openDetail(item) {
    if (item.typeSearch === 'product') {
      history.navigate(routesConfig.moveProductDetail(item.slug), {
        replace: true,
      });
    }
    if (item.typeSearch === 'recipe') {
      history.navigate(routesConfig.moveRecipeDetail(item.slug), {
        replace: true,
      });
    }
  }

  function handleChangeInput(event) {
    const { value } = event.target;
    setInputValue(value);

    if (!value.trim()) setOpen(false);
  }

  function handleEnter(event) {
    if (event.key === 'Enter' && activeIndex != null && items[activeIndex]) {
      openDetail(items[activeIndex]);
      setActiveIndex(null);
      setOpen(false);
    }
  }

  function handleClickItem(item) {
    openDetail(item);
    setOpen(false);
    refs.domReference.current?.focus();
  }

  useEffect(() => {
    if (!debounceValue.trim()) {
      setOpen(false);
      setItems([]);
      return;
    }
    const handleSearch = async () => {
      const items = await search({ keySearch: debounceValue.trim() });
      setItems(items);
      if (items.length > 0) {
        setOpen(true);
        setActiveIndex(0);
      }
    };
    handleSearch();
  }, [debounceValue]);

  return (
    <div
      className={clsx([
        styles.wrapper,
        {
          [className]: className,
        },
      ])}
      ref={refs.setPositionReference}
    >
      <input
        {...getReferenceProps({
          ref: refs.setReference,
          onChange: handleChangeInput,
          value: inputValue,
          onKeyDown: handleEnter,
          'aria-autocomplete': 'list',
        })}
        type="text"
        placeholder={t(placeholder)}
        className={clsx([
          {
            [inputClassName]: inputClassName,
          },
        ])}
      />

      {!isLoading && <SearchIcon className={styles.icon} />}
      {isLoading && <Loader className={styles.icon} r={20} borderWidth={2} />}
      {open && (
        <FloatingFocusManager
          context={context}
          initialFocus={-1}
          visuallyHiddenDismiss
        >
          <ul
            className={clsx([
              styles.floating,
              {
                [floaterClassName]: floaterClassName,
              },
            ])}
            {...getFloatingProps({
              ref: refs.setFloating,
              style: {
                ...floatingStyles,
              },
            })}
          >
            {items.map((item, index) => (
              <ItemWrapper
                key={index}
                className={clsx([
                  styles.itemWrapper,
                  {
                    [itemWrapperClassName]: itemWrapperClassName,
                  },
                  {
                    [itemWrapperActiveClassName]: activeIndex === index,
                  },
                ])}
                {...getItemProps({
                  ref(node) {
                    listRef.current[index] = node;
                  },
                  onClick: () => handleClickItem(item),
                })}
              >
                {renderItem && renderItem(item, index, activeIndex === index)}
              </ItemWrapper>
            ))}
          </ul>
        </FloatingFocusManager>
      )}
    </div>
  );
}

PropTypes.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  floaterClassName: PropTypes.string,
  itemWrapperClassName: PropTypes.string,
  itemWrapperActiveClassName: PropTypes.string,
  renderItem: PropTypes.func,
};

export default SearchBar;

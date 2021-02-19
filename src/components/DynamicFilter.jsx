import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import AnimateHeight from 'react-animate-height';

const SelectFilter = (filter, selectHandleChange) => (
  <div>
    <h2 className="text-lg">{filter.label}</h2>
    <Select
      options={filter.options.map((option) => ({
        value: option.value,
        label: option.label,
      }))}
      defaultValue={
        filter.default || {
          value: filter.options[0].value,
          label: filter.options[0].label,
        }
      }
      onChange={(selectedValue) => {
        selectHandleChange(filter.value, selectedValue);
      }}
    />
  </div>
);

const Filters = (filters, selectHandleChange) => (
  <>
    {filters
      .filter((filter) => ['select'].includes(filter.type))
      .map((filter) => {
        switch (filter.type) {
          case 'select':
            return (
              <SelectFilter
                filter={filter}
                selectHandleChange={selectHandleChange}
              />
            );
          default:
            return null;
        }
      })}
  </>
);

export default ({ filters, filterChangeHandler, hidden }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  // const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    filterChangeHandler(selectedFilters);
  }, [selectedFilters]);

  function selectHandleChange(propName, selected) {
    setSelectedFilters({
      ...selectedFilters,
      [propName]: selected.value,
    });
  }

  return (
    <div>
      <AnimateHeight height={hidden ? 0 : 'auto'}>
        <div className="my-3 grid grid-cols-1 sm:grid-cols-2 sm: gap-x-4">
          <Filters filters={filters} selectHandleChange={selectHandleChange} />
        </div>
      </AnimateHeight>
    </div>
  );
};

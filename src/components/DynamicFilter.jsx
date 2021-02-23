import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { nanoid } from 'nanoid';
import AnimateHeight from 'react-animate-height';

const SelectFilter = ({ filter, selectHandleChange }) => (
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

const Filters = ({ filters, selectHandleChange }) => (
  <>
    {filters
      .map((filter) => {
        // in the future, there may be multiple filter types
        if (filter.type === 'select') {
          return (
            <SelectFilter
              filter={filter}
              selectHandleChange={selectHandleChange}
              key={nanoid()}
            />
          );
        }
        return null;
      })}
  </>
);

export default ({ filters, filterChangeHandler, hidden }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
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

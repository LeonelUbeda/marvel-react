import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { nanoid } from 'nanoid';
import AnimateHeight from 'react-animate-height';

const SelectFilter = ({ label, options, onChange, defaultValue }) => (
  <div>
    <h2 className="text-lg">{label}</h2>
    <Select
      options={options}
      defaultValue={
        defaultValue || {
          value: options[0].value,
          label: options[0].label
        }
      }
      onChange={({ value }) => onChange(value)}
    />
  </div>
);

export default ({ filters, filterChangeHandler, hidden }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  useEffect(() => {
    filterChangeHandler(selectedFilters);
  }, [selectedFilters]);

  function selectHandleChange(propName, value) {
    setSelectedFilters((state) => ({
      ...state,
      [propName]: value
    }));
  }

  return (
    <div>
      <AnimateHeight height={hidden ? 0 : 'auto'}>
        <div className="my-3 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4">
          {filters
            .map((filter) => {
              // in the future, there may be multiple filter types
              switch (filter.type) {
                case 'select': {
                  return (
                    <SelectFilter
                      label={filter.label}
                      options={filter.options}
                      defaultValue={filter.default}
                      onChange={(value) => selectHandleChange(filter.propName, value)}
                      key={nanoid()}
                    />
                  );
                }
                default: {
                  return null;
                }
              }
            })}
        </div>
      </AnimateHeight>
    </div>
  );
};

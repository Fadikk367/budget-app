import React, { useMemo } from 'react';
import { Form, Field } from 'react-final-form';

import { groupBy, noop } from 'lodash';

const required = value => (value ? undefined : 'Required!')

const AddTransactionForm = ({ onSubmit = noop, categories, groupCategoriesBy }) => {
  const groupedCategoriesByParentName = useMemo(
    () => groupCategoriesBy ? groupBy(categories, groupCategoriesBy) : null, 
    [categories, groupCategoriesBy]
  );

  const categoryItems = useMemo(
    () => groupedCategoriesByParentName 
      ? Object.entries(groupedCategoriesByParentName)
        .map(([parentName, categories]) => (
          <optgroup key={parentName} label={parentName}>
            {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
          </optgroup>
      ))
      : categories.map(category => (
        <option key={category.id} value={category.id}>{category.name}</option>
      )),
    [groupedCategoriesByParentName, categories]
  );
  
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="description" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Description</label>
                <input {...input} type="text" placeholder="Username" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="amount" validate={required} parse={value => parseFloat(value, 10)}>
            {({ input, meta }) => (
              <div>
                <label>Amount</label>
                <input {...input} type="number" step="0.01" placeholder="Username" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="categoryId" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Category</label>
                <select {...input}>
                  {categoryItems}
                </select>
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="date" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Date</label>
                <input {...input} type="date" placeholder="Username" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  )
}

export default AddTransactionForm;

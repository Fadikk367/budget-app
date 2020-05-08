import React, { useRef, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import 'styled-components/macro';

import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

import { selectParentCategory } from 'data/actions/budgetActions';

const BudgetCategoryList = ({ 
  budgetCategories, allCategories, budget, 
  selectParentCategory 
}) => {
  const { t } = useTranslation();
  const handleClickParentCategoryRef = useRef(null);
  const budgetCategoriesByParent = useMemo(
    () => groupBy(
      budgetCategories, 
      item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
    ), [budgetCategories, allCategories]);

  const handleClearParentCategorySelect = useCallback(
    () => {
      selectParentCategory();
      handleClickParentCategoryRef.current();
    },
    [selectParentCategory, handleClickParentCategoryRef]
  );

  const handleOtherParentCategorySelect = useCallback(
    () => {
      selectParentCategory(null);
      handleClickParentCategoryRef.current();
    },
    [selectParentCategory, handleClickParentCategoryRef]
  );

  const listItems = useMemo(() => Object
    .entries(budgetCategoriesByParent)
    .map(([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory 
          name={parentName}
          onClick={() => {
            onClick(parentName);
            selectParentCategory(parentName);
          }}
          categories={categories}
          transactions={budget.transactions}
        />
      ),
      children: categories.map(budgetedCategory => {
        const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId);
        return (
          <CategoryItem 
            key={budgetedCategory.id}
            name={name}
            item={budgetedCategory}
            transactions={budget.transactions}
          />
        )
      })
    })), 
    [allCategories, budget.transactions, budgetCategoriesByParent, selectParentCategory]
  );

  const totalSpent = useMemo(
    () => budget.transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
    [budget.transactions]
  );

  const restToSpend = useMemo(
    () => budget.totalAmount - totalSpent, 
    [budget.totalAmount, totalSpent]
  );

  const amountTaken = useMemo(
    () => budgetCategories.reduce((acc, budgetedCategory) => {
      const categoryTransactions = budget.transactions
        .filter(transaction => transaction.categoryId === budgetedCategory.id);

      const categoryExpenses = categoryTransactions
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      return acc + Math.max(categoryExpenses, budgetedCategory.budget);
    }, 0), 
    [budget.transactions, budgetCategories]
  );

  const notBudgetedTransactions = useMemo(
    () => budget.transactions
      .filter(transaction => !budgetCategories
      .find(budgetCategory => budgetCategory.id === transaction.categoryId)),
    [budget.transactions, budgetCategories]
  );

  const notBudgetedExpenses = useMemo(
    () => notBudgetedTransactions
      .reduce((acc, transaction) => acc + transaction.amount, 0),
    [notBudgetedTransactions]
  );

  const availableForRestCategories = useMemo(
    () => budget.totalAmount - amountTaken - notBudgetedExpenses,
    [amountTaken, budget.totalAmount, notBudgetedExpenses]
  );

  return (
    <div>
      <div 
        css={`
          border-bottom: 5px solid ${({ theme }) => theme.colors.gray.ligth}
        `}
      >
        <ParentCategory 
          name={budget.name}
          amount={restToSpend}
          onClick={handleClearParentCategorySelect}
        />
      </div>
      <ToggleableList 
        items={listItems}
        clickRef={handleClickParentCategoryRef}
      />
      <div
        css={`
          border-top: 5px solid ${({ theme }) => theme.colors.gray.ligth}
        `}
      >
        <ParentCategory 
          name={t('Other categories')}
          amount={availableForRestCategories}
          onClick={handleOtherParentCategorySelect}
        />
      </div>
    </div>
  )
}

export default connect(state => ({
  budgetCategories: state.budget.budgetCategories,
  allCategories: state.common.allCategories,
  budget: state.budget.budget
}), {
  selectParentCategory
})(BudgetCategoryList);

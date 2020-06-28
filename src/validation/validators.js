const validateStockField = (vStockUnit) => {
  const errors = [];
  if (!vStockUnit.$dirty) return errors
  !vStockUnit.required && errors.push('Stock is required.');
  !vStockUnit.integer && errors.push('Decimal is not allowed');
  !vStockUnit.minValue && errors.push('Minimum value of stock is 1');
  return errors;
}

export default {
  validateStockField
}
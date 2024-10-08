export function phoneMask(value: string | undefined) {

  if (!value || value === undefined) { return '' };

  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");

  return value;
}
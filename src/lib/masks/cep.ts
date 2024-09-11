export function cepMask(value: string | undefined) {
  if (!value || value === undefined) {
    return ''
  }

  value = value.replace(/\D/g, '');
  // Aplica a máscara de CEP (XXXXX-XXX)

  value = value.replace(/^(\d{5})(\d{3})$/, "$1-$2");

  return value;
}
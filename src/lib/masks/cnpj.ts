export function cnpjMask(value: string | undefined) {
  if (!value || value === undefined) {
    return '';
  }

  value = value.replace(/\D/g, '');
  // Aplica a máscara de CNPJ (XX.XXX.XXX/XXXX-XX)

  value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");

  return value;
}

import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type CEP = {
  bairro: string;
  cep: string;
  logradouro: string;
  complemento: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
export async function getCep(CEP: string): Promise<CEP> {
  const cepResponse = await axios.get<{
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    service: string;
  }>(`https://brasilapi.com.br/api/cep/v1/${CEP}`);

  const cepData = cepResponse.data;
  const { state, city, neighborhood, street, cep } = cepData;

  const normalizedCity = city
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  console.log(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}?providers=dados-abertos-br,gov,wikipedia`)
  console.log(normalizedCity)
  const municipalData = await axios.get<{ nome: string; codigo_ibge: string }[]>(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}?providers=dados-abertos-br,gov,wikipedia`);

  const cityData = municipalData.data.find((municipio) =>
    municipio.nome
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') === normalizedCity);

  return {
    bairro: neighborhood,
    cep,
    logradouro: street,
    complemento: '',
    localidade: city,
    uf: state,
    ibge: cityData?.codigo_ibge ?? '',
    gia: '',
    ddd: '',
    siafi: '',
  };
}

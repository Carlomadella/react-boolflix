import React from "react";
import ReactCountryFlag from "react-country-flag";

const langToCountry = {
  it: "IT",
  en: "US",
  fr: "FR",
  es: "ES",
  de: "DE",
  ja: "JP",
  zh: "CN",
  ru: "RU",
  pt: "PT",
};

const Flag = ({ lang }) => {
  const countryCode = langToCountry[lang] || "UN"; // Fallback: UN = Nazioni Unite

  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
    />
  );
}

export default Flag;
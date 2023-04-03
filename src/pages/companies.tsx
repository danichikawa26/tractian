import { useEffect, useState } from "react";
import { ICompany } from "../interfaces/company";
import { getCompanies } from "../services/companyService";

export const Companies = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [companiesResponse] = await Promise.all([getCompanies()]);
      setCompanies(companiesResponse);
    };
    fetchData();
  }, []);

  const renderCompany = (company: ICompany) => {
    return (
      <div key={company.id}>
        <h2>{company.name}</h2>
      </div>
    );
  };

  return <div>{companies.map(company => renderCompany(company))}</div>;
};

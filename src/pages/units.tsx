import { useEffect, useState } from "react";
import { IUnit } from "../interfaces/unit";
import { getUnits } from "../services/unitService";

export const Units = () => {
  const [units, setUnits] = useState<IUnit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [unitsResponse] = await Promise.all([getUnits()]);
      setUnits(unitsResponse);
    };
    fetchData();
  }, []);

  const renderUnit = (unit: IUnit) => {
    return (
      <div key={unit.id}>
        <h2>{unit.name}</h2>
      </div>
    );
  };

  return <div>{units.map(unit => renderUnit(unit))}</div>;
};

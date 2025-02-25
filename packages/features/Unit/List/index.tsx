import Grid from 'app/features/Unit/List/_Grid';
import UnitCard from 'app/features/Unit/List/_UnitCard';
import React, { FC } from 'react'
import AddUnitDialog from '../Create/AddUnitDialog';

interface UnitListProps {
  data: any[];
}

const UnitList: FC<UnitListProps> = ({ data }) => {
  return (
    <Grid className="max-md:pb-6">
      {data.map((unit: any) => {
        return <UnitCard unit={unit} key={unit.uf_id} />;
      })}
      <div
        className={
          "border border-outline dark:border-outline-dark border-dashed rounded-lg flex items-center justify-center max-lg:border-0 py-28 max-lg:py-0"
        }
      >
        <AddUnitDialog />
      </div>
    </Grid>
  );
}

export default UnitList
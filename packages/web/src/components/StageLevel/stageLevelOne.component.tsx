import { Controller, UseFormReturn } from 'react-hook-form';
import Label from '../UI/Label/label.component';
import Select from '../UI/Select/select.component';
import { SellNowStageOneProps } from '../../pages/SellNow/types';
import { PulseLoader } from 'react-spinners';

type StageLevelProps = {
  labelTextOne: string;
  labelTextTwo: string;
  dataSourceOne: Record<'name', string>[];
  dataSourceTwo: Record<'name', string>[];
  form: UseFormReturn<SellNowStageOneProps, any>;
  onSubmit: () => void;
  isLoading?: boolean;
};

const StageLevelOne = ({
  isLoading,
  dataSourceOne,
  dataSourceTwo,
  labelTextOne,
  labelTextTwo,
  form,
  onSubmit,
}: StageLevelProps) => {
  return (
    <form className="mt-3 w-full grid grid-cols-2 gap-5" onSubmit={onSubmit}>
      <div className="flex flex-col">
        <div className="relative border border-black w-full py-1 px-1 bg-transparent flex flex-col flex-1 rounded-xl max-h-16">
          <Label className="text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
            {labelTextOne}
          </Label>
          <Controller
            control={form.control}
            name="year"
            render={({ field: { onChange } }) => (
              <Select
                onChange={(e: { name: string }) => onChange(e.name)}
                dataSource={dataSourceOne}
                cachedValue={form.getValues('year')}
              />
            )}
          />
        </div>
        <span className="lg:pl-1 text-sm text-red-500">{form.formState.errors?.year?.message}</span>
      </div>
      <div className="flex flex-col">
        <div className="relative border border-black w-full py-1 px-1 bg-transparent flex flex-col flex-1 rounded-xl max-h-16">
          <Label className="text-sm text-black border-none focus:outline-none active:outline-none bg-transparent px-1">
            {labelTextTwo}
          </Label>
          <Controller
            control={form.control}
            name="brand"
            render={({ field: { onChange } }) => (
              <Select
                onChange={(e: { name: string }) => onChange(e.name)}
                dataSource={dataSourceTwo}
                cachedValue={form.getValues('brand')}
              />
            )}
          />
        </div>
        <span className="lg:pl-1 text-sm text-red-500">{form.formState.errors.year?.message}</span>
      </div>
      <div className="w-full col-span-2">
        <button
          type="submit"
          // disabled={carsBrands?.length === 0 || sellNowYears?.length === 0}
          className="block mx-auto w-32 text-black text-base mt-10  border  border-black p-2 rounded-lg disabled:bg-gray-500/25 disabled:border-none disabled:text-white disabled:cursor-not-allowed"
        >
          {form.formState.isSubmitting || isLoading ? <PulseLoader color="#1f1f1f" /> : 'Continue'}
        </button>
      </div>
    </form>
  );
};

export default StageLevelOne;

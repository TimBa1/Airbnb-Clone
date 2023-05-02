"use client";
import useRentModal from "@components/app/hooks/useRentModal";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInputs from "../input/CategoryInputs";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../input/CountrySelect";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [steps, setSteps] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });
const category = watch('category')

const setCustomValue = (id:string, value:any)=>{
   setValue(
      id, value,{
         shouldValidate:true,
         shouldDirty:true,
         shouldTouch:true
      }
   )
}
  const onBack = () => {
    setSteps((value) => value - 1);
  };

  const onNext = () => {
    setSteps((value) => value + 1);
  };

  
  const actionLabel = useMemo(() => {
    if (steps === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [steps]);


  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [steps]);

  let bodyContent = (
    <div className=" flex flex-col gap-8">
      <Heading
        title="Which of thes best describes your place"
        subtile="Pick a category"
        center
      />
      <div className="grid grid-col-2 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInputs
              icon={item.icon}
              label={item.label}
              selected={category ===item.label}
              onClick={(category) => setCustomValue('category', category)}
            />
          </div>
        ))}
      </div>
    </div>
  );

if(steps === STEPS.LOCATION){
  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where is your place located" subtile="Help guest find you" center/>
      <CountrySelect/>
    </div>
  )
}
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your Home"
      body={bodyContent}
    />
  );
};

export default RentModal;

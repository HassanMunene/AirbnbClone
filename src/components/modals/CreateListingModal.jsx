'use client';
{/*
This is the modal we will use to create a listing
*/}

import { useMemo, useState } from "react";
import BaseModal from "./BaseModal";
import useCreateListingModal from "@/app/hooks/useCreateListingModal";
import { categories } from "../navbar/Categories";
import CategoryInputElement from "../common/CategoryInputElement";
import { useForm } from "react-hook-form";
import SelectCountryDropdown from "../common/SelectCountryDropdown";
import dynamic from "next/dynamic";
import AmenitiesCounter from "../common/AmenitiesCounter";
import ImageUploadComponent from "../common/ImageUploadComponent";
import InputElement from "../common/InputElement";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const STEPS = {
    CATEGORY: 0,
    LOCATION: 1,
    INFO: 2,
    IMAGES: 3,
    DESCRIPTION: 4,
    PRICE: 5
}

const CreateListingModal = () => {
    const createListingModal = useCreateListingModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm({
        defaultValues: {
            category: '',
            locationValue: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });
    
    //keep track of the category field
    const category = watch('category');
    const locationValue = watch('locationValue');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    //const allValues = watch();
    //console.log(allValues)

    //update and validate the value of a specific form field
    const handleCategoryChange = (categoryLabel) => {
        setValue('category', categoryLabel, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    };
    //update and validate locationValue field
    const handleLocationChange = (selectedValue) => {
        setValue('locationValue', selectedValue, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const goToPreviousStep = () => {
        setStep((value) => value - 1);
    }
    const goToNextStep = () => {
        setStep((value) => value + 1);
    }

    const primaryLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next'
    }, [step]);

    const secondaryLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    //declare an empty body content that we will overwrite depending on the step we are in
    let bodyContent = (
        <div></div>
    )
    //body content when we are in step 0 choosing category
    if (step === STEPS.CATEGORY) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <div className="text-start">
                    <div className="font-bold text-2xl">Which of these best describes your place</div>
                    <div className="font-medium text-neutral-500 mt-2">Pick a category</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {categories.map((item) => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInputElement 
                                onCategorySelect={handleCategoryChange}
                                label={item.label}
                                icon={item.icon}
                                selected={category === item.label}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    //dynamically import the Map component reasons for this are written in my Airbnb clone book
    const Map = useMemo(() => dynamic(() => import('../map/Map'), {ssr: false}), [locationValue])
    //body content when we are in step 1 choosing location
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <div className="text-start">
                    <div className="font-bold text-2xl">Where is your place located?</div>
                    <div className="font-medium text-neutral-500 mt-2">Help guests find you!</div>
                </div>
                <SelectCountryDropdown
                    value={locationValue} 
                    onLocationChange={handleLocationChange}
                />
                <Map center={locationValue?.latlng}/>
            </div>
        )
    }

    //body content when we are in step 2 adding more Information
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <div className="text-start">
                    <div className="font-bold text-2xl">Share some basics about your place</div>
                    <div className="font-medium text-neutral-500 mt-2">What amenities do you have?</div>
                </div>
                <AmenitiesCounter 
                    title="Guests" 
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setValue('guestCount', value)}
                />
                <AmenitiesCounter 
                    title="Rooms" 
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setValue('roomCount', value)}
                />
                <AmenitiesCounter 
                    title="Bathrooms" 
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setValue('bathroomCount', value)}
                />
            </div>
        )
    }

    //body content when we are in step 3 adding an image for listing
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <div className="text-start">
                    <div className="font-bold text-2xl">Add a photo for your place</div>
                    <div className="font-medium text-neutral-500 mt-2">Show your guests what your place looks like!</div>
                </div>
                <ImageUploadComponent 
                    value={imageSrc} 
                    onChange={(value) => setValue('imageSrc', value)}
                />
            </div>
        )
    }
    
    //body content when we are in step 4 of adding description
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <div className="text-start">
                    <div className="font-bold text-2xl">How would you describe your place</div>
                    <div className="font-medium text-neutral-500 mt-2">Short and Sweet works best</div>
                </div>
                <InputElement
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required={true} 
                />
                <InputElement
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required={true} 
                />
            </div>
        )
    }

    //body content when we are in step 5 of setting the price
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <div className="text-start">
                    <div className="font-bold text-2xl">Now, set your price</div>
                    <div className="font-medium text-neutral-500 mt-2">How much do you charge per night?</div>
                </div>
                <InputElement 
                    id="price"
                    label="Price"
                    formatPrice={true}
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required={true}
                />
            </div>
        )
    }

    //handle submitting the listing
    const onSubmit = (data) => {
        if(step !== STEPS.PRICE) {
            return goToNextStep();
        }
        setIsLoading(true);
        axios.post('/api/listings', data).then(() => {
            toast.success('Listing created successfully!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            createListingModal.onClose();
        })
        .catch((error) => {
            console.log(error);
            toast.error('Something went wrong!');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <BaseModal
            isOpen={createListingModal.isOpen}
            modalTitle="Airbnb your home"
            modalBody={bodyContent}
            onClose={createListingModal.onClose}
            primaryLabel={primaryLabel}
            secondaryLabel={secondaryLabel}
            handleSecondaryLabelSubmit={step === STEPS.CATEGORY ? undefined : goToPreviousStep}
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default CreateListingModal;
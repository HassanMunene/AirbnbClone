'use client';

import Container from "@/components/common/Container";
import HeaderComponent from "@/components/common/HeaderComponent";
import ListingCard from "@/components/listings/ListingCard";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ReservationPageComponent = ({reservations, currentUser}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancelReservation = useCallback((id) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation cancelled');
            router.refresh();
        })
        .catch(() => {
            toast.error('Something wrong happened');
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router]);

    return (
        <Container>
            <HeaderComponent
                title="Reservations"
                subtitle="Bookings on your property"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                        onAction={onCancelReservation}
                    />
                ))}
            </div>
        </Container>
    )
}

export default ReservationPageComponent;
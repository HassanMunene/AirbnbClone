'use client'
import Container from "@/components/common/Container"
import HeaderComponent from "@/components/common/HeaderComponent"
import ListingCard from "@/components/listings/ListingCard"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"

const TripsPageComponent = ({reservations, currentUser}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancelReservation = useCallback((id) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation cancelled');
            router.refresh();
        })
        .catch((error) => {
            console.log(error)
            toast.error('Something went wrong');
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router]);
    return (
        <Container>
            <HeaderComponent 
                title="Trips"
                subtitle="Where you've been and where you're going"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => {
                    return (
                        <ListingCard 
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancelReservation}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancel Reservation"
                            currentUser={currentUser}
                        />
                    )
                })}
            </div>
        </Container>
    )
}

export default TripsPageComponent;
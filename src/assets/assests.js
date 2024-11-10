import car1Image from './images//compact-nissan-versa.avif'
import car2Image from './images/luxury-cadi-xts.avif'
import car3Image from './images/suv-santa-fe.avif'
import car4Image from './images/truck-ford-f150.avif'
import car5Image from './images/luxury-cadi-xts.avif'
export const cars = [
    {
        id: 'car1',
        name: 'Toyota Camry',
        image: car1Image,
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        type: 'Sedan',
        engine: '2.5L I4',
        transmission: 'Automatic',
        color: 'White',
        price: 24000,
        about: 'The Toyota Camry is known for its comfort, reliability, and fuel efficiency, making it a top choice for families and professionals alike.',
        dealer: {
            name: 'Richmond Toyota Dealership',
            address: {
                line1: '101 Richmond Ave',
                line2: 'City Center, London'
            }
        }
    },
    {
        id: 'car2',
        name: 'Honda Civic',
        image: car2Image,
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        type: 'Sedan',
        engine: '1.5L Turbo',
        transmission: 'Manual',
        color: 'Blue',
        price: 22000,
        about: 'The Honda Civic offers a sporty feel with its turbocharged engine, delivering both efficiency and performance for city driving and beyond.',
        dealer: {
            name: 'London Honda Center',
            address: {
                line1: '202 Honda Street',
                line2: 'City Center, London'
            }
        }
    },
    {
        id: 'car3',
        name: 'Ford F-150',
        image: car3Image,
        make: 'Ford',
        model: 'F-150',
        year: 2023,
        type: 'Truck',
        engine: '3.5L V6',
        transmission: 'Automatic',
        color: 'Black',
        price: 35000,
        about: 'The Ford F-150 is a powerful, durable truck with advanced features, ideal for both work and leisure.',
        dealer: {
            name: 'Ford Trucks & More',
            address: {
                line1: '303 Truck Lane',
                line2: 'Industrial Park, London'
            }
        }
    },
    {
        id: 'car4',
        name: 'BMW X5',
        image: car4Image,
        make: 'BMW',
        model: 'X5',
        year: 2022,
        type: 'SUV',
        engine: '3.0L I6',
        transmission: 'Automatic',
        color: 'Silver',
        price: 60000,
        about: 'The BMW X5 combines luxury, power, and style, with a spacious interior and advanced tech features.',
        dealer: {
            name: 'London Luxury Autos',
            address: {
                line1: '404 Prestige Ave',
                line2: 'Luxury District, London'
            }
        }
    },
    {
        id: 'car5',
        name: 'Tesla Model 3',
        image: car5Image,
        make: 'Tesla',
        model: 'Model 3',
        year: 2022,
        type: 'Electric',
        engine: 'Electric',
        transmission: 'Automatic',
        color: 'Red',
        price: 45000,
        about: 'Tesla Model 3 is an all-electric sedan that combines performance, cutting-edge technology, and a sustainable driving experience.',
        dealer: {
            name: 'Tesla Dealership',
            address: {
                line1: '505 Green Way',
                line2: 'Innovation Park, London'
            }
        }
    }
];

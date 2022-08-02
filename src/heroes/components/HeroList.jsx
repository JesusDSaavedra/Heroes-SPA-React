
import { useMemo } from 'react';
import { HeroCard } from './HeroCard';
import { getHeroresByPublisher } from '../helpers'

export const HeroList = ({ publisher }) => {

    const heroes = useMemo( () => getHeroresByPublisher( publisher ), [ publisher ]);

  return (
    <>
        <div className='row row-cols-sm-1 row-cols-md-3 g-3'>
            {
                heroes.map( hero => (
                    <HeroCard 
                        key={hero.id}
                        {...hero}
                    />
                ))
            }
        </div>
    </>
  )
}

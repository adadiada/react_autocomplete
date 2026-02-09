import React from 'react';
import { Person } from './types/Person';

type Props = {
  people: Person[];
  delay?: number;
  onSelected?: (p: Person | null) => void;
};

export const Autocomplete: React.FC<Props> = React.memo(({
  people,
  delay = 300,
  onSelected = () = {},
}) => {
  return (
    <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
      {people.map((person) =>
        <div
          key={person.id}
          onClick={() => onSelected(people)}
          className="dropdown-item"
          data-cy="suggestion-item"
          >
            <p className="has-text-link">{person.name}</p>
          </div>
      )};

    </div>
  )
});

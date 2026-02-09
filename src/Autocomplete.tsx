import React, { useState } from 'react';
import { Person } from './types/Person';

type Props = {
  people: Person[];
  onSelected?: (p: Person | null) => void;
};

export const Autocomplete: React.FC<Props> = React.memo(({
  people,
  onSelected = () => {},
}) => {
  return (
    <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
      {people.map((person) => (
        <div
          key={person.id}
          onClick={() => onSelected(person)}
          className="dropdown-item"
          data-cy="suggestion-item"
          >
            <p className="has-text-link">{person.name}</p>
          </div>
      ))}

      </div>
    );
  },
);

import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.scss';
import { Person } from './types/Person';
import { peopleFromServer } from './data/people';

import { Autocomplete } from './Autocomplete';
import debounce from 'lodash.debounce';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Person | null>(null);
  const [applyQuery, setApplyQuery] = useState('');

  const handleSelectePerson = (person: Person | null) => {
    setSelected(person);
  };

  const applieQuery = useMemo(() => debounce(setApplyQuery, 300), []);

  useEffect(() => () => applieQuery.cancel(), [applieQuery]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    setSelected(null);
    applieQuery(event.target.value);
  };

  const filteredPeople = useMemo(() => {
    if (!applyQuery) {
      return peopleFromServer;
    }

    return peopleFromServer.filter(person =>
      person.name.toLowerCase().includes(applyQuery.toLowerCase()),
    );
  }, [applyQuery]);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {selected
            ? `${selected.name} (${selected.born} - ${selected.died})`
            : 'No selected person'}
        </h1>

        <div className="dropdown is-active">
          <div className="dropdown-trigger">
            <input
              type="text"
              ref={titleField}
              placeholder="Enter a part of the name"
              className="input"
              data-cy="search-input"
              value={query}
              onChange={handleQueryChange}
            />
          </div>
        </div>
        <Autocomplete
          people={filteredPeople}
          onSelected={handleSelectePerson}
        />
        {query.trim() !== '' && filteredPeople.length === 0 && (
          <div
            className="
      notification
      is-danger
      is-light
      mt-3
      is-align-self-flex-start
    "
            role="alert"
            data-cy="no-suggestions-message"
          >
            <p className="has-text-danger">No matching suggestions</p>
          </div>
        )}
      </main>
    </div>
  );
};

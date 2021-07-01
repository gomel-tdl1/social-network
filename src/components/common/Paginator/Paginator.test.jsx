import React from 'react';
import {act, create} from 'react-test-renderer';
import Paginator from "./Paginator";

describe('Paginator component', () => {
   test('Pages count is 6, but should be displayed 5', () => {
      const component = create(<Paginator totalCount={6} pageSize={5}/>)
   });
});
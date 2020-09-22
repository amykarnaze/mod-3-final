import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
jest.mock('../../apiCalls.js')
import { postOrder } from '../../apiCalls';



{
  "orders": [{
    "id": 1,
    "name": "Pat",
    "ingredients": ["beans", "lettuce", "carnitas", "queso fresco", "jalapeno"]
  }, {
    "id": 2,
    "name": "Sam",
    "ingredients": ["steak", "pico de gallo", "lettuce", "carnitas", "queso fresco", "jalapeno"]
  }, {
    "id": 3,
    "name": "Alex",
    "ingredients": ["sofritas", "beans", "sour cream", "carnitas", "queso fresco"]
  }]
}
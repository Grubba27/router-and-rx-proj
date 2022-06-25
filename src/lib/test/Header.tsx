import {Component, Input} from "@angular/core";
import {module1, module2} from 'foo';

export default function AppHeader(param1: string, param2: number) {
  const imports = [module1, module2];

  let input;
  let other;

  if (param1 === param2) {
    return (<div> true </div>);
  }

  return (<div>false{{input}}<span>{{other}}</span></div>);
}

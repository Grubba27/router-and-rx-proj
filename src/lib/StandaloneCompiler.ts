import * as fs from "fs";

const pascalCaseToKebab = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
const getImports = (list: string[]) => {
  return list.filter(item => item.includes('import') && item.includes('from')).join('\n');
}
const getComponentName = (list: string[]) => {
  const result = list.find(item => item.includes('default') && item.includes('App'));
  if (result === undefined) {
    return 'err';
  }
  const componentName = result.split(' ').find(item => item.includes('App'));
  if (componentName === undefined) {
    return 'missing component App in component name';
  }

  return pascalCaseToKebab(componentName.split('(')[0]);
}
const getClassName = (list: string[]) => {
  const result = list.find(item => item.includes('default') && item.includes('App'));
  if (result === undefined) {
    return 'err';
  }
  const className = result.split(' ').find(item => item.includes('App'));
  if (className === undefined) {
    return 'missing class App in component name';
  }

  return className.split('(')[0].replace('App', '').concat('Component');
}

const getComponentParams = (list: string[]) => {
  const result = list.find(item => item.includes('default') && item.includes('App'));
  if (result === undefined) {
    return 'err';
  }

  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(result);
  if (matches === null) {
    return 'missing parenthesis in component name';
  }
  return matches[1].split(',').map(item => `public ${item}`).join(', ');
}


const transformLetInInput = (list: string[]) => {
  // @ts-ignore
  return list.map(item => {
    if (item.includes('let')) {
      return item.replace('let', '@Input()').replace(';', '; \n');
    }
  }).filter(Boolean).join(' ');
}

const getModules = (list: string[]) => {
  const result = list.find(item => item.includes('const') && item.includes('imports'));
  if (result === undefined) {
    return 'err';
  }
  const moduleName = result.split(' = ')[1].replace(';', ',');
  if (moduleName === undefined) {
    return 'missing modules in component';
  }

  return moduleName;
}


const returnStatement = (list: string[]) => {
  const result = list.filter(item => item.includes('if') && item.includes('('));
  const result2 = list.filter(item => item.includes('return') && item.includes('('));

  let lastNgIf: string[] = [];
  return result2.map((item, index) => {
    const regExp = /\(([^)]+)\)/;
    const r = regExp.exec(item);
    if (r === null) {
      return 'missing parenthesis in component name';
    }
    const last = result2[result2.length - 1];
    if (item === last) {
      return r[1];
    }

    const i = regExp.exec(result[index]);
    const ngIf = i === null ? '' : `*ngIf="${i[1]}"`;
    lastNgIf.push(ngIf);
    return `<ng-container ${ngIf}> ${r[1]} </ng-container>`;
  }).join('\n');

}

const template = (c: Component) => `
${c.fileImports}

@Component({
  selector: '${c.selector}',
  standalone: true,
  template: \`${c.template}\`,
  imports: ${c.imports}
})
export class ${c.className} {
  ${c.inputs}

  constructor(${c.constructorParams}) {}
}
`;

type Component = {
  fileImports: string;
  selector: string;
  template: string;
  imports: string;
  className: string;
  constructorParams: string;
  inputs: string;
}

const main = async () => {
  await fs.readFile(
    'src/lib/test/Header.tsx',
    'utf-8',
    (err, data) => {
      if (err) {
        console.log(err);
      }
      const c = data.split('\n');
      const component = template( {
        fileImports: getImports(c),
        selector: getComponentName(c),
        template: returnStatement(c),
        imports: getModules(c),
        className: getClassName(c),
        constructorParams: getComponentParams(c),
        inputs: transformLetInInput(c)
      })
      console.log('component', component)
      fs.writeFile('src/lib/test/header.component.ts', component, (err) => err)
    });
}
main();

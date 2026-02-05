export function formatEmailForDisplay(email: string): string {
  if (!email) return '****@****.com';
  const [name, domain] = email.split('@');

  if (!name || !domain) return '****@****.com';

  const visible = name.length > 2 ? name.substring(0, 3) : name.substring(0, 1);

  return `${visible}****@${domain}`;
};

export function processingByDataObj(data: object, htmlString: string) {
    let template: string = htmlString;
  
    for (const key in data) {
      let stringReplace: string | undefined = undefined;
  
      if (htmlString.includes(`{{${key}}}`)) stringReplace = `{{${key}}}`;
      else if (htmlString.includes(`{{ ${key} }}`))
        stringReplace = `{{ ${key} }}`;
  
      if (stringReplace) template = template.replaceAll(stringReplace, data[key]);
    }
  
    return template;
  }
  
  export function processingByDataArr(data: object[], htmlString: string) {
    let template = htmlString;
  
    data.forEach((item) => {
      if (typeof item === 'object' && item !== null) {
        template = processingByDataObj(item, template);
      }
    });
  
    return template;
  }
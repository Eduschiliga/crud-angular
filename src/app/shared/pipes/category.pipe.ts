import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Front-end':
        return 'code';
      case 'Back-end':
        return 'computer';
      case 'Data Science':
        return 'analytics';
      case 'Artificial Intelligence':
        return 'smart_toy';
      case 'Cybersecurity':
        return 'security';
      case 'DevOps':
        return 'cloud';
      case 'Marketing':
        return 'campaign';
      case 'Cloud Computing':
        return 'cloud_queue';
      default:
        return 'code';
    }
  }
}

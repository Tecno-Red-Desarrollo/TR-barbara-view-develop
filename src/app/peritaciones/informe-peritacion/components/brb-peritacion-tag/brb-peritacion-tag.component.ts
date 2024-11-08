import { Component, Input, SimpleChanges } from '@angular/core';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'brb-peritacion-tag',
  templateUrl: './brb-peritacion-tag.component.html',
  styleUrls: ['./brb-peritacion-tag.component.css']
})
export class BrbPeritacionTagComponent extends Tag {
  tagStyle = {
    background: 'linear-gradient(90deg, rgba(241,241,241,1) 0%, rgba(220,220,220,1) 83%)',
    color: '#515151'
  }

  @Input('backgroundColor') backgroundColor: string;
  @Input('color') color: string;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['backgroundColor']) {
      this.tagStyle.background = this.backgroundColor;
    }
    if (changes['color']) {
      this.tagStyle.color = this.color;
    }
  }
}
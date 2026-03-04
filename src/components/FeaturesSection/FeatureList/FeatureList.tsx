import React from 'react';
import FeatureItem from '@/components/FeaturesSection/FeatureList/FeatureItem/FeatureItem';

type FeatureListProps = {
  items: string[];
};

export default function FeatureList({ items }: FeatureListProps) {
  return (
    <ul>
      {items.map((feature, i) => (
        <FeatureItem key={i}>{feature}</FeatureItem>
      ))}
    </ul>
  );
}

import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  badge: string;
  description: string;
  tags: string[];
  href?: string;
}

const FeatureCard = ({ title, badge, description, tags, href }: FeatureCardProps) => {
  const content = (
    <>
      <div className="flex justify-between items-start gap-2 mb-2">
        <span className="font-semibold">{title}</span>
        <span className="badge-primary">{badge}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="mini-tag">
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  if (href) {
    return (
      <Link to={href} className="feature-card h-full">
        {content}
      </Link>
    );
  }

  return <div className="feature-card h-full">{content}</div>;
};

export default FeatureCard;

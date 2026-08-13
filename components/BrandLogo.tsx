type BrandLogoProps = {
  tone?: "navy" | "white";
  variant?: "primary" | "horizontal" | "mark";
  className?: string;
};

/**
 * Approved Salimi Engineering identity, rendered from the vector masters in
 * /public/images/brand. The artwork is the design source of truth: it is never
 * redrawn, re-typed or rasterised here.
 *
 * The logo is decorative at the markup level — every use sits inside a link
 * that already carries an accessible name ("Salimi Engineering — Home"), so
 * the image is hidden from assistive technology to avoid announcing the brand
 * twice.
 *
 * No "use client": this has no client-side behaviour.
 */
export function BrandLogo({
  tone = "navy",
  variant = "primary",
  className
}: BrandLogoProps) {
  const suffix = tone === "white" ? "white" : "navy";

  const src =
    variant === "mark"
      ? `/images/brand/salimi-engineering-mark-${suffix}.svg`
      : variant === "horizontal"
        ? "/images/brand/salimi-engineering-horizontal-navy.svg"
        : `/images/brand/salimi-engineering-primary-${suffix}.svg`;

  // Intrinsic viewBox dimensions, so the browser reserves the correct aspect
  // ratio before the SVG loads and the header does not shift.
  const dimensions =
    variant === "mark"
      ? { width: 100, height: 100 }
      : variant === "horizontal"
        ? { width: 900, height: 100 }
        : { width: 640, height: 180 };

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}

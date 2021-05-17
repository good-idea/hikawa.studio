export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: any }
}

export interface AnnouncementSettings {
  __typename: 'AnnouncementSettings'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  enabled?: Maybe<Scalars['Boolean']>
  announcements?: Maybe<Array<Maybe<AnnouncementText>>>
  backgroundColor?: Maybe<Color>
  textColor?: Maybe<Color>
}

export type AnnouncementSettingsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  enabled?: Maybe<BooleanFilter>
  backgroundColor?: Maybe<ColorFilter>
  textColor?: Maybe<ColorFilter>
}

export type AnnouncementSettingsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  enabled?: Maybe<SortOrder>
  backgroundColor?: Maybe<ColorSorting>
  textColor?: Maybe<ColorSorting>
}

export interface AnnouncementText {
  __typename: 'AnnouncementText'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  bodyRaw?: Maybe<Scalars['JSON']>
  cta?: Maybe<Cta>
}

export type AnnouncementTextFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cta?: Maybe<CtaFilter>
}

export type AnnouncementTextSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cta?: Maybe<CtaSorting>
}

export interface Block {
  __typename: 'Block'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<Span>>>
  style?: Maybe<Scalars['String']>
  list?: Maybe<Scalars['String']>
}

export type BlockOrRichImageOrVideoEmbed = Block | RichImage | VideoEmbed

export type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Boolean']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Boolean']>
}

export interface CheckoutSettings {
  __typename: 'CheckoutSettings'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  textRaw?: Maybe<Scalars['JSON']>
}

export type CheckoutSettingsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type CheckoutSettingsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface Color {
  __typename: 'Color'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  hex?: Maybe<Scalars['String']>
  alpha?: Maybe<Scalars['Float']>
  hsl?: Maybe<HslaColor>
  hsv?: Maybe<HsvaColor>
  rgb?: Maybe<RgbaColor>
}

export type ColorFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  hex?: Maybe<StringFilter>
  alpha?: Maybe<FloatFilter>
  hsl?: Maybe<HslaColorFilter>
  hsv?: Maybe<HsvaColorFilter>
  rgb?: Maybe<RgbaColorFilter>
}

export type ColorSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  hex?: Maybe<SortOrder>
  alpha?: Maybe<SortOrder>
  hsl?: Maybe<HslaColorSorting>
  hsv?: Maybe<HsvaColorSorting>
  rgb?: Maybe<RgbaColorSorting>
}

export interface Cta {
  __typename: 'Cta'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  link?: Maybe<
    Array<Maybe<PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink>>
  >
}

export type CtaFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
}

export type CtaSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
}

export type DateFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Date']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Date']>
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['Date']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['Date']>
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['Date']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['Date']>
}

export type DatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['DateTime']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['DateTime']>
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['DateTime']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['DateTime']>
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['DateTime']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['DateTime']>
}

/** A Sanity document */
export type Document = {
  /** Document ID */
  _id: Scalars['ID']
  /** Document type */
  _type: Scalars['String']
  /** Date the document was created */
  _createdAt: Scalars['DateTime']
  /** Date the document was last modified */
  _updatedAt: Scalars['DateTime']
  /** Current document revision */
  _rev: Scalars['String']
}

export type DocumentFilter = {
  /** All documents referencing the given document ID. */
  references?: Maybe<Scalars['ID']>
  /** All documents that are drafts. */
  is_draft?: Maybe<Scalars['Boolean']>
}

export interface File {
  __typename: 'File'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  asset?: Maybe<SanityFileAsset>
}

export type FileFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  asset?: Maybe<SanityFileAssetFilter>
}

export type FileSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export type FloatFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Float']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Float']>
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['Float']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['Float']>
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['Float']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['Float']>
}

export interface FooterSettings {
  __typename: 'FooterSettings'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  links?: Maybe<Array<Maybe<PageLink>>>
  textRaw?: Maybe<Scalars['JSON']>
}

export type FooterSettingsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type FooterSettingsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface Gallery {
  __typename: 'Gallery'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  images?: Maybe<Array<Maybe<RichImage>>>
}

export type GalleryFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type GallerySorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface Geopoint {
  __typename: 'Geopoint'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  lat?: Maybe<Scalars['Float']>
  lng?: Maybe<Scalars['Float']>
  alt?: Maybe<Scalars['Float']>
}

export type GeopointFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  lat?: Maybe<FloatFilter>
  lng?: Maybe<FloatFilter>
  alt?: Maybe<FloatFilter>
}

export type GeopointSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  lat?: Maybe<SortOrder>
  lng?: Maybe<SortOrder>
  alt?: Maybe<SortOrder>
}

export interface Header {
  __typename: 'Header'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type HeaderFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  text?: Maybe<StringFilter>
}

export type HeaderOrPageLink = Header | PageLink

export type HeaderSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  text?: Maybe<SortOrder>
}

export interface Hero {
  __typename: 'Hero'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  heroSlides?: Maybe<Array<Maybe<HeroSlide>>>
}

export type HeroFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export interface HeroSlide {
  __typename: 'HeroSlide'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  images?: Maybe<Array<Maybe<RichImage>>>
  descriptionRaw?: Maybe<Scalars['JSON']>
  cta?: Maybe<Cta>
}

export type HeroSlideFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cta?: Maybe<CtaFilter>
}

export type HeroSlideSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cta?: Maybe<CtaSorting>
}

export type HeroSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface Homepage extends Document {
  __typename: 'Homepage'
  /** Document ID */
  _id: Scalars['ID']
  /** Document type */
  _type: Scalars['String']
  /** Date the document was created */
  _createdAt: Scalars['DateTime']
  /** Date the document was last modified */
  _updatedAt: Scalars['DateTime']
  /** Current document revision */
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  hero?: Maybe<Hero>
  content?: Maybe<Array<Maybe<PageLinkOrRichText>>>
  seo?: Maybe<Seo>
}

export type HomepageFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  hero?: Maybe<HeroFilter>
  seo?: Maybe<SeoFilter>
}

export type HomepageSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  hero?: Maybe<HeroSorting>
  seo?: Maybe<SeoSorting>
}

export interface HslaColor {
  __typename: 'HslaColor'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  h?: Maybe<Scalars['Float']>
  s?: Maybe<Scalars['Float']>
  l?: Maybe<Scalars['Float']>
  a?: Maybe<Scalars['Float']>
}

export type HslaColorFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  h?: Maybe<FloatFilter>
  s?: Maybe<FloatFilter>
  l?: Maybe<FloatFilter>
  a?: Maybe<FloatFilter>
}

export type HslaColorSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  h?: Maybe<SortOrder>
  s?: Maybe<SortOrder>
  l?: Maybe<SortOrder>
  a?: Maybe<SortOrder>
}

export interface HsvaColor {
  __typename: 'HsvaColor'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  h?: Maybe<Scalars['Float']>
  s?: Maybe<Scalars['Float']>
  v?: Maybe<Scalars['Float']>
  a?: Maybe<Scalars['Float']>
}

export type HsvaColorFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  h?: Maybe<FloatFilter>
  s?: Maybe<FloatFilter>
  v?: Maybe<FloatFilter>
  a?: Maybe<FloatFilter>
}

export type HsvaColorSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  h?: Maybe<SortOrder>
  s?: Maybe<SortOrder>
  v?: Maybe<SortOrder>
  a?: Maybe<SortOrder>
}

export type IdFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['ID']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['ID']>
  /** Checks if the value matches the given word/words. */
  matches?: Maybe<Scalars['ID']>
  in?: Maybe<Array<Scalars['ID']>>
  nin?: Maybe<Array<Scalars['ID']>>
}

export interface Image {
  __typename: 'Image'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  asset?: Maybe<SanityImageAsset>
  hotspot?: Maybe<SanityImageHotspot>
  crop?: Maybe<SanityImageCrop>
}

export type ImageFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  asset?: Maybe<SanityImageAssetFilter>
  hotspot?: Maybe<SanityImageHotspotFilter>
  crop?: Maybe<SanityImageCropFilter>
}

export type ImageSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  hotspot?: Maybe<SanityImageHotspotSorting>
  crop?: Maybe<SanityImageCropSorting>
}

export interface InstagramSettings {
  __typename: 'InstagramSettings'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** Don't include the @ */
  handle?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  images?: Maybe<Array<Maybe<RichImage>>>
}

export type InstagramSettingsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
}

export type InstagramSettingsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
}

export type IntFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Int']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Int']>
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['Int']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['Int']>
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['Int']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['Int']>
}

export interface MailerSettings {
  __typename: 'MailerSettings'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  popupEnabled?: Maybe<Scalars['Boolean']>
  popupTextRaw?: Maybe<Scalars['JSON']>
  popupBackground?: Maybe<RichImage>
  footerTextRaw?: Maybe<Scalars['JSON']>
  buttonLabel?: Maybe<Scalars['String']>
}

export type MailerSettingsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  popupEnabled?: Maybe<BooleanFilter>
  popupBackground?: Maybe<RichImageFilter>
  buttonLabel?: Maybe<StringFilter>
}

export type MailerSettingsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  popupEnabled?: Maybe<SortOrder>
  popupBackground?: Maybe<RichImageSorting>
  buttonLabel?: Maybe<SortOrder>
}

export interface MainNavigationSettings {
  __typename: 'MainNavigationSettings'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  links?: Maybe<Array<Maybe<PageLinkOrUrlLink>>>
}

export type MainNavigationSettingsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type MainNavigationSettingsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface NavigationSettings {
  __typename: 'NavigationSettings'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  header?: Maybe<MainNavigationSettings>
  footer?: Maybe<FooterSettings>
}

export type NavigationSettingsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  header?: Maybe<MainNavigationSettingsFilter>
  footer?: Maybe<FooterSettingsFilter>
}

export type NavigationSettingsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  header?: Maybe<MainNavigationSettingsSorting>
  footer?: Maybe<FooterSettingsSorting>
}

export interface Page extends Document {
  __typename: 'Page'
  /** Document ID */
  _id: Scalars['ID']
  /** Document type */
  _type: Scalars['String']
  /** Date the document was created */
  _createdAt: Scalars['DateTime']
  /** Date the document was last modified */
  _updatedAt: Scalars['DateTime']
  /** Current document revision */
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  slug?: Maybe<PageSlug>
  hero?: Maybe<Hero>
  contentRaw?: Maybe<Scalars['JSON']>
  gallery?: Maybe<Array<Maybe<RichImage>>>
  includeInstagram?: Maybe<Scalars['Boolean']>
  seo?: Maybe<Seo>
}

export type PageFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  slug?: Maybe<PageSlugFilter>
  hero?: Maybe<HeroFilter>
  includeInstagram?: Maybe<BooleanFilter>
  seo?: Maybe<SeoFilter>
}

export interface PageInfo {
  __typename: 'PageInfo'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  hasNextPage?: Maybe<Scalars['Boolean']>
  hasPreviousPage?: Maybe<Scalars['Boolean']>
}

export type PageInfoFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  hasNextPage?: Maybe<BooleanFilter>
  hasPreviousPage?: Maybe<BooleanFilter>
}

export type PageInfoSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  hasNextPage?: Maybe<SortOrder>
  hasPreviousPage?: Maybe<SortOrder>
}

export interface PageLink {
  __typename: 'PageLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  link?: Maybe<
    Array<Maybe<PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink>>
  >
  /** (optional) If empty, the title of the linked collection, product, or page will be used. */
  label?: Maybe<Scalars['String']>
  images?: Maybe<Array<Maybe<RichImage>>>
  textPreviewRaw?: Maybe<Scalars['JSON']>
  textOnTop?: Maybe<Scalars['Boolean']>
  fullWidth?: Maybe<Scalars['Boolean']>
}

export type PageLinkFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
  textOnTop?: Maybe<BooleanFilter>
  fullWidth?: Maybe<BooleanFilter>
}

export type PageLinkOrRichText = PageLink | RichText

export type PageLinkOrUrlLink = PageLink | UrlLink

export type PageLinkSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
  textOnTop?: Maybe<SortOrder>
  fullWidth?: Maybe<SortOrder>
}

export type PageOrShopOrShopifyCollectionOrShopifyProduct =
  | Page
  | Shop
  | ShopifyCollection
  | ShopifyProduct

export type PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink =
  | Page
  | Shop
  | ShopifyCollection
  | ShopifyProduct
  | UrlLink

export interface PageSlug {
  __typename: 'PageSlug'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  current?: Maybe<Scalars['String']>
}

export type PageSlugFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  current?: Maybe<StringFilter>
}

export type PageSlugSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  current?: Maybe<SortOrder>
}

export type PageSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  slug?: Maybe<PageSlugSorting>
  hero?: Maybe<HeroSorting>
  includeInstagram?: Maybe<SortOrder>
  seo?: Maybe<SeoSorting>
}

export interface ProductSettings {
  __typename: 'ProductSettings'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  textRaw?: Maybe<Scalars['JSON']>
}

export type ProductSettingsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type ProductSettingsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface RgbaColor {
  __typename: 'RgbaColor'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  r?: Maybe<Scalars['Float']>
  g?: Maybe<Scalars['Float']>
  b?: Maybe<Scalars['Float']>
  a?: Maybe<Scalars['Float']>
}

export type RgbaColorFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  r?: Maybe<FloatFilter>
  g?: Maybe<FloatFilter>
  b?: Maybe<FloatFilter>
  a?: Maybe<FloatFilter>
}

export type RgbaColorSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  r?: Maybe<SortOrder>
  g?: Maybe<SortOrder>
  b?: Maybe<SortOrder>
  a?: Maybe<SortOrder>
}

export interface RichImage {
  __typename: 'RichImage'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  asset?: Maybe<SanityImageAsset>
  hotspot?: Maybe<SanityImageHotspot>
  crop?: Maybe<SanityImageCrop>
  caption?: Maybe<Scalars['String']>
  /** A short description of the image. Helps with accessibility and SEO */
  altText?: Maybe<Scalars['String']>
}

export type RichImageFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  asset?: Maybe<SanityImageAssetFilter>
  hotspot?: Maybe<SanityImageHotspotFilter>
  crop?: Maybe<SanityImageCropFilter>
  caption?: Maybe<StringFilter>
  altText?: Maybe<StringFilter>
}

export type RichImageSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  hotspot?: Maybe<SanityImageHotspotSorting>
  crop?: Maybe<SanityImageCropSorting>
  caption?: Maybe<SortOrder>
  altText?: Maybe<SortOrder>
}

export interface RichText {
  __typename: 'RichText'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  blocksRaw?: Maybe<Scalars['JSON']>
  /** (Only applies to text blocks on the homepage) */
  fullWidth?: Maybe<Scalars['Boolean']>
}

export type RichTextFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  fullWidth?: Maybe<BooleanFilter>
}

export type RichTextSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  fullWidth?: Maybe<SortOrder>
}

export interface RootQuery {
  __typename: 'RootQuery'
  Document?: Maybe<Document>
  Page?: Maybe<Page>
  Homepage?: Maybe<Homepage>
  SiteSettings?: Maybe<SiteSettings>
  Shop?: Maybe<Shop>
  ShopifyProduct?: Maybe<ShopifyProduct>
  ShopifyCollection?: Maybe<ShopifyCollection>
  SanityImageAsset?: Maybe<SanityImageAsset>
  SanityFileAsset?: Maybe<SanityFileAsset>
  allPage: Array<Page>
  allHomepage: Array<Homepage>
  allSiteSettings: Array<SiteSettings>
  allShop: Array<Shop>
  allShopifyProduct: Array<ShopifyProduct>
  allShopifyCollection: Array<ShopifyCollection>
  allSanityImageAsset: Array<SanityImageAsset>
  allSanityFileAsset: Array<SanityFileAsset>
}

export type RootQueryDocumentArgs = {
  id: Scalars['ID']
}

export type RootQueryPageArgs = {
  id: Scalars['ID']
}

export type RootQueryHomepageArgs = {
  id: Scalars['ID']
}

export type RootQuerySiteSettingsArgs = {
  id: Scalars['ID']
}

export type RootQueryShopArgs = {
  id: Scalars['ID']
}

export type RootQueryShopifyProductArgs = {
  id: Scalars['ID']
}

export type RootQueryShopifyCollectionArgs = {
  id: Scalars['ID']
}

export type RootQuerySanityImageAssetArgs = {
  id: Scalars['ID']
}

export type RootQuerySanityFileAssetArgs = {
  id: Scalars['ID']
}

export type RootQueryAllPageArgs = {
  where?: Maybe<PageFilter>
  sort?: Maybe<Array<PageSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllHomepageArgs = {
  where?: Maybe<HomepageFilter>
  sort?: Maybe<Array<HomepageSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllSiteSettingsArgs = {
  where?: Maybe<SiteSettingsFilter>
  sort?: Maybe<Array<SiteSettingsSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllShopArgs = {
  where?: Maybe<ShopFilter>
  sort?: Maybe<Array<ShopSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllShopifyProductArgs = {
  where?: Maybe<ShopifyProductFilter>
  sort?: Maybe<Array<ShopifyProductSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllShopifyCollectionArgs = {
  where?: Maybe<ShopifyCollectionFilter>
  sort?: Maybe<Array<ShopifyCollectionSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllSanityImageAssetArgs = {
  where?: Maybe<SanityImageAssetFilter>
  sort?: Maybe<Array<SanityImageAssetSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllSanityFileAssetArgs = {
  where?: Maybe<SanityFileAssetFilter>
  sort?: Maybe<Array<SanityFileAssetSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export interface SanityAssetSourceData {
  __typename: 'SanityAssetSourceData'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** A canonical name for the source this asset is originating from */
  name?: Maybe<Scalars['String']>
  /** The unique ID for the asset within the originating source so you can programatically find back to it */
  id?: Maybe<Scalars['String']>
  /** A URL to find more information about this asset in the originating source */
  url?: Maybe<Scalars['String']>
}

export type SanityAssetSourceDataFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
}

export type SanityAssetSourceDataSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
  url?: Maybe<SortOrder>
}

export interface SanityFileAsset extends Document {
  __typename: 'SanityFileAsset'
  /** Document ID */
  _id: Scalars['ID']
  /** Document type */
  _type: Scalars['String']
  /** Date the document was created */
  _createdAt: Scalars['DateTime']
  /** Date the document was last modified */
  _updatedAt: Scalars['DateTime']
  /** Current document revision */
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  originalFilename?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  altText?: Maybe<Scalars['String']>
  sha1hash?: Maybe<Scalars['String']>
  extension?: Maybe<Scalars['String']>
  mimeType?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  assetId?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  source?: Maybe<SanityAssetSourceData>
}

export type SanityFileAssetFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  originalFilename?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<StringFilter>
  altText?: Maybe<StringFilter>
  sha1hash?: Maybe<StringFilter>
  extension?: Maybe<StringFilter>
  mimeType?: Maybe<StringFilter>
  size?: Maybe<FloatFilter>
  assetId?: Maybe<StringFilter>
  path?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  source?: Maybe<SanityAssetSourceDataFilter>
}

export type SanityFileAssetSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  originalFilename?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
  altText?: Maybe<SortOrder>
  sha1hash?: Maybe<SortOrder>
  extension?: Maybe<SortOrder>
  mimeType?: Maybe<SortOrder>
  size?: Maybe<SortOrder>
  assetId?: Maybe<SortOrder>
  path?: Maybe<SortOrder>
  url?: Maybe<SortOrder>
  source?: Maybe<SanityAssetSourceDataSorting>
}

export interface SanityImageAsset extends Document {
  __typename: 'SanityImageAsset'
  /** Document ID */
  _id: Scalars['ID']
  /** Document type */
  _type: Scalars['String']
  /** Date the document was created */
  _createdAt: Scalars['DateTime']
  /** Date the document was last modified */
  _updatedAt: Scalars['DateTime']
  /** Current document revision */
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  originalFilename?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  altText?: Maybe<Scalars['String']>
  sha1hash?: Maybe<Scalars['String']>
  extension?: Maybe<Scalars['String']>
  mimeType?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  assetId?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  metadata?: Maybe<SanityImageMetadata>
  source?: Maybe<SanityAssetSourceData>
}

export type SanityImageAssetFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  originalFilename?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<StringFilter>
  altText?: Maybe<StringFilter>
  sha1hash?: Maybe<StringFilter>
  extension?: Maybe<StringFilter>
  mimeType?: Maybe<StringFilter>
  size?: Maybe<FloatFilter>
  assetId?: Maybe<StringFilter>
  path?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  metadata?: Maybe<SanityImageMetadataFilter>
  source?: Maybe<SanityAssetSourceDataFilter>
}

export type SanityImageAssetSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  originalFilename?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
  altText?: Maybe<SortOrder>
  sha1hash?: Maybe<SortOrder>
  extension?: Maybe<SortOrder>
  mimeType?: Maybe<SortOrder>
  size?: Maybe<SortOrder>
  assetId?: Maybe<SortOrder>
  path?: Maybe<SortOrder>
  url?: Maybe<SortOrder>
  metadata?: Maybe<SanityImageMetadataSorting>
  source?: Maybe<SanityAssetSourceDataSorting>
}

export interface SanityImageCrop {
  __typename: 'SanityImageCrop'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  top?: Maybe<Scalars['Float']>
  bottom?: Maybe<Scalars['Float']>
  left?: Maybe<Scalars['Float']>
  right?: Maybe<Scalars['Float']>
}

export type SanityImageCropFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  top?: Maybe<FloatFilter>
  bottom?: Maybe<FloatFilter>
  left?: Maybe<FloatFilter>
  right?: Maybe<FloatFilter>
}

export type SanityImageCropSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  top?: Maybe<SortOrder>
  bottom?: Maybe<SortOrder>
  left?: Maybe<SortOrder>
  right?: Maybe<SortOrder>
}

export interface SanityImageDimensions {
  __typename: 'SanityImageDimensions'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  aspectRatio?: Maybe<Scalars['Float']>
}

export type SanityImageDimensionsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  height?: Maybe<FloatFilter>
  width?: Maybe<FloatFilter>
  aspectRatio?: Maybe<FloatFilter>
}

export type SanityImageDimensionsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  height?: Maybe<SortOrder>
  width?: Maybe<SortOrder>
  aspectRatio?: Maybe<SortOrder>
}

export interface SanityImageHotspot {
  __typename: 'SanityImageHotspot'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  x?: Maybe<Scalars['Float']>
  y?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
}

export type SanityImageHotspotFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  x?: Maybe<FloatFilter>
  y?: Maybe<FloatFilter>
  height?: Maybe<FloatFilter>
  width?: Maybe<FloatFilter>
}

export type SanityImageHotspotSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  x?: Maybe<SortOrder>
  y?: Maybe<SortOrder>
  height?: Maybe<SortOrder>
  width?: Maybe<SortOrder>
}

export interface SanityImageMetadata {
  __typename: 'SanityImageMetadata'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  location?: Maybe<Geopoint>
  dimensions?: Maybe<SanityImageDimensions>
  palette?: Maybe<SanityImagePalette>
  lqip?: Maybe<Scalars['String']>
  hasAlpha?: Maybe<Scalars['Boolean']>
  isOpaque?: Maybe<Scalars['Boolean']>
}

export type SanityImageMetadataFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  location?: Maybe<GeopointFilter>
  dimensions?: Maybe<SanityImageDimensionsFilter>
  palette?: Maybe<SanityImagePaletteFilter>
  lqip?: Maybe<StringFilter>
  hasAlpha?: Maybe<BooleanFilter>
  isOpaque?: Maybe<BooleanFilter>
}

export type SanityImageMetadataSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  location?: Maybe<GeopointSorting>
  dimensions?: Maybe<SanityImageDimensionsSorting>
  palette?: Maybe<SanityImagePaletteSorting>
  lqip?: Maybe<SortOrder>
  hasAlpha?: Maybe<SortOrder>
  isOpaque?: Maybe<SortOrder>
}

export interface SanityImagePalette {
  __typename: 'SanityImagePalette'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  darkMuted?: Maybe<SanityImagePaletteSwatch>
  lightVibrant?: Maybe<SanityImagePaletteSwatch>
  darkVibrant?: Maybe<SanityImagePaletteSwatch>
  vibrant?: Maybe<SanityImagePaletteSwatch>
  dominant?: Maybe<SanityImagePaletteSwatch>
  lightMuted?: Maybe<SanityImagePaletteSwatch>
  muted?: Maybe<SanityImagePaletteSwatch>
}

export type SanityImagePaletteFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  darkMuted?: Maybe<SanityImagePaletteSwatchFilter>
  lightVibrant?: Maybe<SanityImagePaletteSwatchFilter>
  darkVibrant?: Maybe<SanityImagePaletteSwatchFilter>
  vibrant?: Maybe<SanityImagePaletteSwatchFilter>
  dominant?: Maybe<SanityImagePaletteSwatchFilter>
  lightMuted?: Maybe<SanityImagePaletteSwatchFilter>
  muted?: Maybe<SanityImagePaletteSwatchFilter>
}

export type SanityImagePaletteSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  darkMuted?: Maybe<SanityImagePaletteSwatchSorting>
  lightVibrant?: Maybe<SanityImagePaletteSwatchSorting>
  darkVibrant?: Maybe<SanityImagePaletteSwatchSorting>
  vibrant?: Maybe<SanityImagePaletteSwatchSorting>
  dominant?: Maybe<SanityImagePaletteSwatchSorting>
  lightMuted?: Maybe<SanityImagePaletteSwatchSorting>
  muted?: Maybe<SanityImagePaletteSwatchSorting>
}

export interface SanityImagePaletteSwatch {
  __typename: 'SanityImagePaletteSwatch'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  background?: Maybe<Scalars['String']>
  foreground?: Maybe<Scalars['String']>
  population?: Maybe<Scalars['Float']>
  title?: Maybe<Scalars['String']>
}

export type SanityImagePaletteSwatchFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  background?: Maybe<StringFilter>
  foreground?: Maybe<StringFilter>
  population?: Maybe<FloatFilter>
  title?: Maybe<StringFilter>
}

export type SanityImagePaletteSwatchSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  background?: Maybe<SortOrder>
  foreground?: Maybe<SortOrder>
  population?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
}

export interface Seo {
  __typename: 'Seo'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** Title for the browser window */
  name?: Maybe<Scalars['String']>
  /** title for search results (will fall back to Page title) */
  metaTitle?: Maybe<Scalars['String']>
  /** This is the description that will appear underneath the preview link when shared in Facebook. It should be less than 200 characters */
  description?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  /** Comma-separated SEO keywords */
  keywords?: Maybe<Scalars['String']>
  /** This text will be used on screen readers when this page is linked to throughout the site. This should be descriptive: "Learn about our company" is better than "About". These link labels also help with SEO. */
  linkLabel?: Maybe<Scalars['String']>
}

export type SeoFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
  metaTitle?: Maybe<StringFilter>
  description?: Maybe<StringFilter>
  image?: Maybe<ImageFilter>
  keywords?: Maybe<StringFilter>
  linkLabel?: Maybe<StringFilter>
}

export type SeoSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
  metaTitle?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
  image?: Maybe<ImageSorting>
  keywords?: Maybe<SortOrder>
  linkLabel?: Maybe<SortOrder>
}

export interface Shop extends Document {
  __typename: 'Shop'
  /** Document ID */
  _id: Scalars['ID']
  /** Document type */
  _type: Scalars['String']
  /** Date the document was created */
  _createdAt: Scalars['DateTime']
  /** Date the document was last modified */
  _updatedAt: Scalars['DateTime']
  /** Current document revision */
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  hero?: Maybe<Hero>
  collections?: Maybe<Array<Maybe<ShopifyCollection>>>
  seo?: Maybe<Seo>
}

export type ShopFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  hero?: Maybe<HeroFilter>
  seo?: Maybe<SeoFilter>
}

export type ShopSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  hero?: Maybe<HeroSorting>
  seo?: Maybe<SeoSorting>
}

export interface ShopifyCollection extends Document {
  __typename: 'ShopifyCollection'
  /** Document ID */
  _id: Scalars['ID']
  /** Document type */
  _type: Scalars['String']
  /** Date the document was created */
  _createdAt: Scalars['DateTime']
  /** Date the document was last modified */
  _updatedAt: Scalars['DateTime']
  /** Current document revision */
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  shopifyId?: Maybe<Scalars['String']>
  archived?: Maybe<Scalars['Boolean']>
  sourceData?: Maybe<ShopifySourceCollection>
  products?: Maybe<Array<Maybe<ShopifyProduct>>>
  hero?: Maybe<Hero>
  backgroundColor?: Maybe<Color>
  keyColor?: Maybe<Color>
  secondaryColor?: Maybe<Color>
  seo?: Maybe<Seo>
}

export type ShopifyCollectionFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  shopifyId?: Maybe<StringFilter>
  archived?: Maybe<BooleanFilter>
  sourceData?: Maybe<ShopifySourceCollectionFilter>
  hero?: Maybe<HeroFilter>
  backgroundColor?: Maybe<ColorFilter>
  keyColor?: Maybe<ColorFilter>
  secondaryColor?: Maybe<ColorFilter>
  seo?: Maybe<SeoFilter>
}

export type ShopifyCollectionSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  shopifyId?: Maybe<SortOrder>
  archived?: Maybe<SortOrder>
  sourceData?: Maybe<ShopifySourceCollectionSorting>
  hero?: Maybe<HeroSorting>
  backgroundColor?: Maybe<ColorSorting>
  keyColor?: Maybe<ColorSorting>
  secondaryColor?: Maybe<ColorSorting>
  seo?: Maybe<SeoSorting>
}

export interface ShopifyMoneyV2 {
  __typename: 'ShopifyMoneyV2'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
}

export type ShopifyMoneyV2Filter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  amount?: Maybe<StringFilter>
  currencyCode?: Maybe<StringFilter>
}

export type ShopifyMoneyV2Sorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  amount?: Maybe<SortOrder>
  currencyCode?: Maybe<SortOrder>
}

export interface ShopifyProduct extends Document {
  __typename: 'ShopifyProduct'
  /** Document ID */
  _id: Scalars['ID']
  /** Document type */
  _type: Scalars['String']
  /** Date the document was created */
  _createdAt: Scalars['DateTime']
  /** Date the document was last modified */
  _updatedAt: Scalars['DateTime']
  /** Current document revision */
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  shopifyId?: Maybe<Scalars['String']>
  minVariantPrice?: Maybe<Scalars['Float']>
  maxVariantPrice?: Maybe<Scalars['Float']>
  archived?: Maybe<Scalars['Boolean']>
  sourceData?: Maybe<ShopifySourceProduct>
  collections?: Maybe<Array<Maybe<ShopifyCollection>>>
  options?: Maybe<Array<Maybe<ShopifyProductOption>>>
  variants?: Maybe<Array<Maybe<ShopifyProductVariant>>>
  hero?: Maybe<Hero>
  /** Just the id within class="..." i.e. klaviyo-form-ABC123 */
  klaviyoFormID?: Maybe<Scalars['String']>
  related?: Maybe<Array<Maybe<PageLink>>>
  seo?: Maybe<Seo>
}

export type ShopifyProductFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  shopifyId?: Maybe<StringFilter>
  minVariantPrice?: Maybe<FloatFilter>
  maxVariantPrice?: Maybe<FloatFilter>
  archived?: Maybe<BooleanFilter>
  sourceData?: Maybe<ShopifySourceProductFilter>
  hero?: Maybe<HeroFilter>
  klaviyoFormID?: Maybe<StringFilter>
  seo?: Maybe<SeoFilter>
}

export interface ShopifyProductOption {
  __typename: 'ShopifyProductOption'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  shopifyOptionId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<ShopifyProductOptionValue>>>
}

export type ShopifyProductOptionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  shopifyOptionId?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
}

export type ShopifyProductOptionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  shopifyOptionId?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
}

export interface ShopifyProductOptionValue {
  __typename: 'ShopifyProductOptionValue'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type ShopifyProductOptionValueFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  value?: Maybe<StringFilter>
}

export type ShopifyProductOptionValueSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  value?: Maybe<SortOrder>
}

export type ShopifyProductSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  shopifyId?: Maybe<SortOrder>
  minVariantPrice?: Maybe<SortOrder>
  maxVariantPrice?: Maybe<SortOrder>
  archived?: Maybe<SortOrder>
  sourceData?: Maybe<ShopifySourceProductSorting>
  hero?: Maybe<HeroSorting>
  klaviyoFormID?: Maybe<SortOrder>
  seo?: Maybe<SeoSorting>
}

export interface ShopifyProductVariant {
  __typename: 'ShopifyProductVariant'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  shopifyVariantID?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  sourceData?: Maybe<ShopifySourceProductVariant>
}

export type ShopifyProductVariantFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  shopifyVariantID?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  sourceData?: Maybe<ShopifySourceProductVariantFilter>
}

export type ShopifyProductVariantSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  shopifyVariantID?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  sourceData?: Maybe<ShopifySourceProductVariantSorting>
}

export interface ShopifySourceCollection {
  __typename: 'ShopifySourceCollection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['Date']>
  handle?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  descriptionHtml?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  image?: Maybe<ShopifySourceImage>
  products?: Maybe<ShopifySourceProductsConnection>
}

export interface ShopifySourceCollectionEdge {
  __typename: 'ShopifySourceCollectionEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceCollectionNode>
}

export type ShopifySourceCollectionEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceCollectionNodeFilter>
}

export type ShopifySourceCollectionEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceCollectionNodeSorting>
}

export type ShopifySourceCollectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  updatedAt?: Maybe<DateFilter>
  handle?: Maybe<StringFilter>
  description?: Maybe<StringFilter>
  descriptionHtml?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
  image?: Maybe<ShopifySourceImageFilter>
  products?: Maybe<ShopifySourceProductsConnectionFilter>
}

export interface ShopifySourceCollectionNode {
  __typename: 'ShopifySourceCollectionNode'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export type ShopifySourceCollectionNodeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
}

export type ShopifySourceCollectionNodeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
}

export type ShopifySourceCollectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
  descriptionHtml?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
  image?: Maybe<ShopifySourceImageSorting>
  products?: Maybe<ShopifySourceProductsConnectionSorting>
}

export interface ShopifySourceCollectionsConnection {
  __typename: 'ShopifySourceCollectionsConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<ShopifySourceCollectionEdge>>>
}

export type ShopifySourceCollectionsConnectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  pageInfo?: Maybe<PageInfoFilter>
}

export type ShopifySourceCollectionsConnectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  pageInfo?: Maybe<PageInfoSorting>
}

export interface ShopifySourceImage {
  __typename: 'ShopifySourceImage'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  altText?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  originalSrc?: Maybe<Scalars['String']>
  w100?: Maybe<Scalars['String']>
  w300?: Maybe<Scalars['String']>
  w800?: Maybe<Scalars['String']>
  w1200?: Maybe<Scalars['String']>
  w1600?: Maybe<Scalars['String']>
}

export interface ShopifySourceImageEdge {
  __typename: 'ShopifySourceImageEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  key?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceImage>
}

export type ShopifySourceImageEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  key?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceImageFilter>
}

export type ShopifySourceImageEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  key?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceImageSorting>
}

export type ShopifySourceImageFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  altText?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
  originalSrc?: Maybe<StringFilter>
  w100?: Maybe<StringFilter>
  w300?: Maybe<StringFilter>
  w800?: Maybe<StringFilter>
  w1200?: Maybe<StringFilter>
  w1600?: Maybe<StringFilter>
}

export type ShopifySourceImageSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  altText?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
  originalSrc?: Maybe<SortOrder>
  w100?: Maybe<SortOrder>
  w300?: Maybe<SortOrder>
  w800?: Maybe<SortOrder>
  w1200?: Maybe<SortOrder>
  w1600?: Maybe<SortOrder>
}

export interface ShopifySourceImages {
  __typename: 'ShopifySourceImages'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  edges?: Maybe<Array<Maybe<ShopifySourceImageEdge>>>
}

export type ShopifySourceImagesFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type ShopifySourceImagesSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface ShopifySourceProduct {
  __typename: 'ShopifySourceProduct'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  availableForSale?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['Date']>
  publishedAt?: Maybe<Scalars['Date']>
  updatedAt?: Maybe<Scalars['Date']>
  compareAtPriceRange?: Maybe<ShopifySourceProductPriceRange>
  priceRange?: Maybe<ShopifySourceProductPriceRange>
  presentmentPriceRanges?: Maybe<ShopifySourceProductPresentmentPriceRangeConnection>
  productType?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  handle?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  descriptionHtml?: Maybe<Scalars['String']>
  vendor?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  images?: Maybe<ShopifySourceImages>
  options?: Maybe<Array<Maybe<ShopifySourceProductOption>>>
  variants?: Maybe<ShopifySourceProductVariantsConnection>
  collections?: Maybe<ShopifySourceCollectionsConnection>
}

export interface ShopifySourceProductEdge {
  __typename: 'ShopifySourceProductEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceProductNode>
}

export type ShopifySourceProductEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceProductNodeFilter>
}

export type ShopifySourceProductEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceProductNodeSorting>
}

export type ShopifySourceProductFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  availableForSale?: Maybe<BooleanFilter>
  createdAt?: Maybe<DateFilter>
  publishedAt?: Maybe<DateFilter>
  updatedAt?: Maybe<DateFilter>
  compareAtPriceRange?: Maybe<ShopifySourceProductPriceRangeFilter>
  priceRange?: Maybe<ShopifySourceProductPriceRangeFilter>
  presentmentPriceRanges?: Maybe<ShopifySourceProductPresentmentPriceRangeConnectionFilter>
  productType?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  description?: Maybe<StringFilter>
  descriptionHtml?: Maybe<StringFilter>
  vendor?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
  images?: Maybe<ShopifySourceImagesFilter>
  variants?: Maybe<ShopifySourceProductVariantsConnectionFilter>
  collections?: Maybe<ShopifySourceCollectionsConnectionFilter>
}

export interface ShopifySourceProductNode {
  __typename: 'ShopifySourceProductNode'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export type ShopifySourceProductNodeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
}

export type ShopifySourceProductNodeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
}

export interface ShopifySourceProductOption {
  __typename: 'ShopifySourceProductOption'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type ShopifySourceProductOptionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
}

export type ShopifySourceProductOptionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
}

export interface ShopifySourceProductPresentmentPriceRangeConnection {
  __typename: 'ShopifySourceProductPresentmentPriceRangeConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  edges?: Maybe<Array<Maybe<ShopifySourceProductPriceRangeEdge>>>
}

export type ShopifySourceProductPresentmentPriceRangeConnectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type ShopifySourceProductPresentmentPriceRangeConnectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface ShopifySourceProductPricePresentmentEdge {
  __typename: 'ShopifySourceProductPricePresentmentEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceProductVariantPricePair>
}

export type ShopifySourceProductPricePresentmentEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceProductVariantPricePairFilter>
}

export type ShopifySourceProductPricePresentmentEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceProductVariantPricePairSorting>
}

export interface ShopifySourceProductPriceRange {
  __typename: 'ShopifySourceProductPriceRange'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  minVariantPrice?: Maybe<ShopifyMoneyV2>
  maxVariantPrice?: Maybe<ShopifyMoneyV2>
}

export interface ShopifySourceProductPriceRangeEdge {
  __typename: 'ShopifySourceProductPriceRangeEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceProductPriceRange>
}

export type ShopifySourceProductPriceRangeEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceProductPriceRangeFilter>
}

export type ShopifySourceProductPriceRangeEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceProductPriceRangeSorting>
}

export type ShopifySourceProductPriceRangeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  minVariantPrice?: Maybe<ShopifyMoneyV2Filter>
  maxVariantPrice?: Maybe<ShopifyMoneyV2Filter>
}

export type ShopifySourceProductPriceRangeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  minVariantPrice?: Maybe<ShopifyMoneyV2Sorting>
  maxVariantPrice?: Maybe<ShopifyMoneyV2Sorting>
}

export type ShopifySourceProductSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  availableForSale?: Maybe<SortOrder>
  createdAt?: Maybe<SortOrder>
  publishedAt?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
  compareAtPriceRange?: Maybe<ShopifySourceProductPriceRangeSorting>
  priceRange?: Maybe<ShopifySourceProductPriceRangeSorting>
  presentmentPriceRanges?: Maybe<ShopifySourceProductPresentmentPriceRangeConnectionSorting>
  productType?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
  descriptionHtml?: Maybe<SortOrder>
  vendor?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
  images?: Maybe<ShopifySourceImagesSorting>
  variants?: Maybe<ShopifySourceProductVariantsConnectionSorting>
  collections?: Maybe<ShopifySourceCollectionsConnectionSorting>
}

export interface ShopifySourceProductVariant {
  __typename: 'ShopifySourceProductVariant'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  availableForSale?: Maybe<Scalars['Boolean']>
  currentlyNotInStock?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  image?: Maybe<ShopifySourceImage>
  priceV2?: Maybe<ShopifyMoneyV2>
  compareAtPriceV2?: Maybe<ShopifyMoneyV2>
  selectedOptions?: Maybe<Array<Maybe<ShopifySourceSelectedOption>>>
  requiresShipping?: Maybe<Scalars['Boolean']>
  sku?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Float']>
  weightUnit?: Maybe<Scalars['String']>
}

export interface ShopifySourceProductVariantEdge {
  __typename: 'ShopifySourceProductVariantEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceProductVariant>
}

export type ShopifySourceProductVariantEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceProductVariantFilter>
}

export type ShopifySourceProductVariantEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceProductVariantSorting>
}

export type ShopifySourceProductVariantFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  availableForSale?: Maybe<BooleanFilter>
  currentlyNotInStock?: Maybe<BooleanFilter>
  id?: Maybe<StringFilter>
  image?: Maybe<ShopifySourceImageFilter>
  priceV2?: Maybe<ShopifyMoneyV2Filter>
  compareAtPriceV2?: Maybe<ShopifyMoneyV2Filter>
  requiresShipping?: Maybe<BooleanFilter>
  sku?: Maybe<StringFilter>
  weight?: Maybe<FloatFilter>
  weightUnit?: Maybe<StringFilter>
}

export interface ShopifySourceProductVariantPricePair {
  __typename: 'ShopifySourceProductVariantPricePair'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  compareAtPrice?: Maybe<ShopifyMoneyV2>
  price?: Maybe<ShopifyMoneyV2>
}

export type ShopifySourceProductVariantPricePairFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  compareAtPrice?: Maybe<ShopifyMoneyV2Filter>
  price?: Maybe<ShopifyMoneyV2Filter>
}

export type ShopifySourceProductVariantPricePairSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  compareAtPrice?: Maybe<ShopifyMoneyV2Sorting>
  price?: Maybe<ShopifyMoneyV2Sorting>
}

export interface ShopifySourceProductVariantPricePresenentmentConnection {
  __typename: 'ShopifySourceProductVariantPricePresenentmentConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  edges?: Maybe<Array<Maybe<ShopifySourceProductPricePresentmentEdge>>>
}

export type ShopifySourceProductVariantPricePresenentmentConnectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type ShopifySourceProductVariantPricePresenentmentConnectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export type ShopifySourceProductVariantSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  availableForSale?: Maybe<SortOrder>
  currentlyNotInStock?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
  image?: Maybe<ShopifySourceImageSorting>
  priceV2?: Maybe<ShopifyMoneyV2Sorting>
  compareAtPriceV2?: Maybe<ShopifyMoneyV2Sorting>
  requiresShipping?: Maybe<SortOrder>
  sku?: Maybe<SortOrder>
  weight?: Maybe<SortOrder>
  weightUnit?: Maybe<SortOrder>
}

export interface ShopifySourceProductVariantsConnection {
  __typename: 'ShopifySourceProductVariantsConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<ShopifySourceProductVariantEdge>>>
}

export type ShopifySourceProductVariantsConnectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  pageInfo?: Maybe<PageInfoFilter>
}

export type ShopifySourceProductVariantsConnectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  pageInfo?: Maybe<PageInfoSorting>
}

export interface ShopifySourceProductsConnection {
  __typename: 'ShopifySourceProductsConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<ShopifySourceProductEdge>>>
}

export type ShopifySourceProductsConnectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  pageInfo?: Maybe<PageInfoFilter>
}

export type ShopifySourceProductsConnectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  pageInfo?: Maybe<PageInfoSorting>
}

export interface ShopifySourceSelectedOption {
  __typename: 'ShopifySourceSelectedOption'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type ShopifySourceSelectedOptionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
  value?: Maybe<StringFilter>
}

export type ShopifySourceSelectedOptionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
  value?: Maybe<SortOrder>
}

export interface SiteSettings extends Document {
  __typename: 'SiteSettings'
  /** Document ID */
  _id: Scalars['ID']
  /** Document type */
  _type: Scalars['String']
  /** Date the document was created */
  _createdAt: Scalars['DateTime']
  /** Date the document was last modified */
  _updatedAt: Scalars['DateTime']
  /** Current document revision */
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  logo?: Maybe<RichImage>
  announcement?: Maybe<AnnouncementSettings>
  navigation?: Maybe<NavigationSettings>
  instagram?: Maybe<InstagramSettings>
  product?: Maybe<ProductSettings>
  checkout?: Maybe<CheckoutSettings>
  mailer?: Maybe<MailerSettings>
  highlight?: Maybe<Color>
  seo?: Maybe<Seo>
}

export type SiteSettingsFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  logo?: Maybe<RichImageFilter>
  announcement?: Maybe<AnnouncementSettingsFilter>
  navigation?: Maybe<NavigationSettingsFilter>
  instagram?: Maybe<InstagramSettingsFilter>
  product?: Maybe<ProductSettingsFilter>
  checkout?: Maybe<CheckoutSettingsFilter>
  mailer?: Maybe<MailerSettingsFilter>
  highlight?: Maybe<ColorFilter>
  seo?: Maybe<SeoFilter>
}

export type SiteSettingsSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  logo?: Maybe<RichImageSorting>
  announcement?: Maybe<AnnouncementSettingsSorting>
  navigation?: Maybe<NavigationSettingsSorting>
  instagram?: Maybe<InstagramSettingsSorting>
  product?: Maybe<ProductSettingsSorting>
  checkout?: Maybe<CheckoutSettingsSorting>
  mailer?: Maybe<MailerSettingsSorting>
  highlight?: Maybe<ColorSorting>
  seo?: Maybe<SeoSorting>
}

export interface Slug {
  __typename: 'Slug'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  current?: Maybe<Scalars['String']>
}

export type SlugFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  current?: Maybe<StringFilter>
}

export type SlugSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  current?: Maybe<SortOrder>
}

export enum SortOrder {
  /** Sorts on the value in ascending order. */
  Asc = 'ASC',
  /** Sorts on the value in descending order. */
  Desc = 'DESC',
}

export interface Span {
  __typename: 'Span'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  marks?: Maybe<Array<Maybe<Scalars['String']>>>
  text?: Maybe<Scalars['String']>
}

export type StringFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['String']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['String']>
  /** Checks if the value matches the given word/words. */
  matches?: Maybe<Scalars['String']>
  in?: Maybe<Array<Scalars['String']>>
  nin?: Maybe<Array<Scalars['String']>>
}

export interface UrlLink {
  __typename: 'UrlLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** Used in Navigation links as the link text. When used within a content block or page link, this text will not be visible, but will be used for accessibility. */
  label?: Maybe<Scalars['String']>
  foo?: Maybe<Scalars['Boolean']>
  url?: Maybe<Scalars['String']>
}

export type UrlLinkFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
  foo?: Maybe<BooleanFilter>
  url?: Maybe<StringFilter>
}

export type UrlLinkSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
  foo?: Maybe<SortOrder>
  url?: Maybe<SortOrder>
}

export interface VideoEmbed {
  __typename: 'VideoEmbed'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  service?: Maybe<Scalars['String']>
  /** Get this from the video URL. Youtube: https://www.youtube.com/watch?v=VIDEO_ID | Vimeo: https://vimeo.com/VIDEO_ID   */
  videoId?: Maybe<Scalars['String']>
  alt?: Maybe<Scalars['String']>
  autoplay?: Maybe<Scalars['Boolean']>
}

export type VideoEmbedFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  service?: Maybe<StringFilter>
  videoId?: Maybe<StringFilter>
  alt?: Maybe<StringFilter>
  autoplay?: Maybe<BooleanFilter>
}

export type VideoEmbedSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  service?: Maybe<SortOrder>
  videoId?: Maybe<SortOrder>
  alt?: Maybe<SortOrder>
  autoplay?: Maybe<SortOrder>
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    BlockOrRichImageOrVideoEmbed: ['Block', 'RichImage', 'VideoEmbed'],
    Document: [
      'Homepage',
      'Page',
      'SanityFileAsset',
      'SanityImageAsset',
      'Shop',
      'ShopifyCollection',
      'ShopifyProduct',
      'SiteSettings',
    ],
    HeaderOrPageLink: ['Header', 'PageLink'],
    PageLinkOrRichText: ['PageLink', 'RichText'],
    PageLinkOrUrlLink: ['PageLink', 'UrlLink'],
    PageOrShopOrShopifyCollectionOrShopifyProduct: [
      'Page',
      'Shop',
      'ShopifyCollection',
      'ShopifyProduct',
    ],
    PageOrShopOrShopifyCollectionOrShopifyProductOrUrlLink: [
      'Page',
      'Shop',
      'ShopifyCollection',
      'ShopifyProduct',
      'UrlLink',
    ],
  },
}
export default result

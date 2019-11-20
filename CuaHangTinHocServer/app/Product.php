<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\FileUpload;
class Product extends Model
{
    //
    protected $table = "Product";
    public $timestamps = false;

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function firstImage() {
        return $this->hasOne(Image::class);
    }

    public function discounts()
    {
        return $this->belongsTo(Discount::class);
    }

    public function employee()
    {
        return $this->belongsTo(EmployeeAccount::class);
    }

    public function producer()
    {
        return $this->belongsTo(Producer::class);
    }

    public function productTypeList() {
        return $this
            ->belongsToMany(Product_Type::class,"list_product_with_type","product_id","product_type_id");
    }

    public function category()
    {
        return $this->belongsTo(Product_Category::class,'product_category_id');
    }


    public function getSummaryProductList()
    {
        $myProduct = DB::table('Product')
            ->leftjoin('Discount', 'Product.discount_id', '=', 'Discount.ID')
            ->leftjoin('image', 'Product.ID', '=', 'image.product_id')
            ->select('Product.ID', 'Product.Name', 'Product.Price', 'Product.Description',
                'Discount.ID as ID_Discount', 'Discount.Name as DiscountName', 'Discount.Percent_Discount',
                'image.ID as ImageID', 'image.image_link')
            ->where('image.ID', '=', 1)
            ->get();

        return $myProduct;//Product::with(['images'])->find(1);
    }

    public function getProduct(Request $request) {
        $id = $request->input('id');
        $product = Product::with(['images'])->find($id);
        return $product;
    }

    public function getStoreProductList() {
        $products = Product::with('category','producer','productTypeList','discounts','images','employee')
            ->get();
        return $products;
    }

    public function insertProduct(Request $request) {
        $str = '';
        if($request->get('image'))
        {
            $image = $request->get('image');
            $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
            \Image::make($request->get('image'))->save(public_path('images/').$name);
            return $name;
        }
        return $str;
    }

}
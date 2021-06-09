using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodChainWebShop.Migrations
{
    public partial class productPriceATM : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "ProductPriceATM",
                table: "OrderProducts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductPriceATM",
                table: "OrderProducts");
        }
    }
}

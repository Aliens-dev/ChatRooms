<?php

namespace Tests\Feature;

use App\Room;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Passport\Passport;
use Tests\TestCase;

class RoomTest extends TestCase
{
    use RefreshDatabase;
    /** @test */
    public function a_user_can_create_a_room()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        $attr = [
            'name' => 'room',
            'type' => '0',
            'user_id' => $user->id,
        ];
        $this->json('POST','/rooms', $attr)
            ->assertStatus(201)
            ->assertJson(['success' => true]);
        $this->assertDatabaseHas('rooms', $attr);
    }
    /** @test */
    public function a_room_name_is_required()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        $attr = [
            'type' => '0',
        ];
        $this->json('POST','/rooms', $attr)
            ->assertStatus(403)
            ->assertJson(['success' => false]);
        $this->assertDatabaseMissing('rooms',$attr);
    }

    /** @test */
    public function a_user_can_update_their_room_information()
    {
        $this->withoutExceptionHandling();

        $user = $this->signIn();
        $room = factory(Room::class)->create(['user_id' => $user->id]);
        $attr = [
            'name' => 'test',
            'type' => 0,
        ];
        $this->json('PATCH', "/rooms/{$room->id}", $attr)
            ->assertJson(['success' => true]);
        $this->assertDatabaseHas('rooms', $attr);
    }
    /** @test */

    public function a_user_cannot_update_rooms_of_others()
    {
        $this->withoutExceptionHandling();
        $me = $this->signIn();
        $otherUser = factory(User::class)->create();
        $attr = [
            'name' => 'test',
            'type' => 0
        ];
        $room  = $otherUser->rooms()->create($attr);
        $this->assertDatabaseHas('rooms', $attr);
        $newAttr = [
            'name' => 'new test',
            'type' => 1
        ];
        $this->actingAs($me)->json('PATCH', "/rooms/{$room->id}", $newAttr)
            ->assertJson(['success' => false])
            ->assertStatus(401);
    }
    /** @test */
    public function a_user_can_delete_his_room()
    {
        $this->withoutExceptionHandling();

        $user = $this->signIn();

        $room = factory(Room::class)->create(['user_id' => $user->id]);

        $this->assertDatabaseHas('rooms', ['name' => $room->name, 'id' => $room->id]);

        $this->json('DELETE', '/rooms/'. $room->id)
            ->assertStatus(200);
        $this->assertDatabaseMissing('rooms',['name' => $room->name, 'id' => $room->id]);
    }

    /** @test */
    public function a_user_cannot_delete_rooms_of_others()
    {
        $this->withoutExceptionHandling();

        $me = factory(User::class)->create();

        $otherUser = factory(User::class)->create();

        $room = factory(Room::class)->create(['user_id' => $otherUser->id]);

        $this->assertDatabaseHas('rooms', ['id' => $room->id, 'name' => $room->name]);

        $this->actingAs($me);
        $this->json('DELETE', "/rooms/{$room->id}")
            ->assertStatus(401);

        $this->assertDatabaseHas('rooms', ['id' => $room->id, 'name' => $room->name]);

    }
}
